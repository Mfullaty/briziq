import { NextResponse } from 'next/server'
import { hashPassword } from '@/server/auth/password'
import { signUpSchema } from '@/server/auth/validation'
import { createUser, findUserByEmail } from '@/server/auth/user-repository'

export async function POST(request: Request) {
    try {
        const payload = signUpSchema.safeParse(await request.json())
        if (!payload.success) {
            return NextResponse.json(
                {
                    message:
                        payload.error.issues[0]?.message ??
                        'Invalid sign-up details.',
                },
                { status: 400 },
            )
        }

        const { email, password, role, userName } = payload.data
        if (await findUserByEmail(email)) {
            return NextResponse.json(
                {
                    message:
                        'An account already exists for this email address.',
                },
                { status: 409 },
            )
        }

        const user = await createUser({
            email,
            name: userName,
            role,
            passwordHash: await hashPassword(password),
        })

        if (!user) throw new Error('Could not create user.')

        return NextResponse.json(
            { status: 'success', message: 'Account created.' },
            { status: 201 },
        )
    } catch {
        return NextResponse.json(
            { message: 'Unable to create your account. Please try again.' },
            { status: 500 },
        )
    }
}
