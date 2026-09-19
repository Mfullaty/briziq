import { db } from '@/prisma/db'
import { ROLES, type Role } from '@/constants/roles.constant'

export type AuthUser = {
    id: string
    email: string
    name: string
    role: Role
    passwordHash: string | null
}

type UserModel = {
    where: (filter: { email?: string; id?: number }) => {
        first: () => Promise<unknown>
    }
    create: (data: Record<string, unknown>) => Promise<unknown>
    update: (
        filter: { id: number },
        data: Record<string, unknown>,
    ) => Promise<unknown>
}

const userModel = db.orm.public.User as unknown as UserModel

function toAuthUser(record: unknown): AuthUser | null {
    if (!record || typeof record !== 'object') return null
    const user = record as Record<string, unknown>
    if (
        typeof user.id !== 'number' ||
        typeof user.email !== 'string' ||
        typeof user.name !== 'string' ||
        typeof user.role !== 'string'
    )
        return null

    return {
        id: String(user.id),
        email: user.email,
        name: user.name,
        role: user.role as Role,
        passwordHash:
            typeof user.passwordHash === 'string' ? user.passwordHash : null,
    }
}

export async function findUserByEmail(email: string) {
    return toAuthUser(await userModel.where({ email }).first())
}

export async function findUserById(id: string) {
    const numericId = Number(id)
    return Number.isInteger(numericId)
        ? toAuthUser(await userModel.where({ id: numericId }).first())
        : null
}

export async function createUser(input: {
    email: string
    name: string
    role: Role
    passwordHash?: string
}) {
    return toAuthUser(await userModel.create(input))
}

export async function updateUserName(id: string, name: string) {
    const numericId = Number(id)
    if (!Number.isInteger(numericId)) return null
    return toAuthUser(await userModel.update({ id: numericId }, { name }))
}

export async function findOrCreateOAuthUser(input: {
    email: string
    name: string
}) {
    const existing = await findUserByEmail(input.email)
    return existing ?? createUser({ ...input, role: ROLES.BUYER })
}
