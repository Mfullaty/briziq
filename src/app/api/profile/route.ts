import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { findUserById, updateUserName } from '@/server/auth/user-repository'
import { profileUpdateSchema } from '@/server/auth/validation'

function unauthorized() {
    return NextResponse.json(
        { message: 'Sign in to access your profile.' },
        { status: 401 },
    )
}

export async function GET() {
    const session = await auth()
    if (!session?.user?.id) return unauthorized()

    const user = await findUserById(session.user.id)
    if (!user)
        return NextResponse.json(
            { message: 'Profile not found.' },
            { status: 404 },
        )

    return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    })
}

export async function PATCH(request: Request) {
    const session = await auth()
    if (!session?.user?.id) return unauthorized()

    const payload = profileUpdateSchema.safeParse(await request.json())
    if (!payload.success) {
        return NextResponse.json(
            {
                message:
                    payload.error.issues[0]?.message ??
                    'Invalid profile details.',
            },
            { status: 400 },
        )
    }

    const user = await updateUserName(session.user.id, payload.data.name)
    if (!user)
        return NextResponse.json(
            { message: 'Profile not found.' },
            { status: 404 },
        )

    return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    })
}
