import type { SignInCredential } from '@/@types/auth'
import { findUserByEmail } from '@/server/auth/user-repository'
import { verifyPassword } from '@/server/auth/password'

const validateCredential = async (values: SignInCredential) => {
    const user = await findUserByEmail(values.email.trim().toLowerCase())
    if (
        !user?.passwordHash ||
        !(await verifyPassword(values.password, user.passwordHash))
    ) {
        return null
    }

    return user
}

export default validateCredential
