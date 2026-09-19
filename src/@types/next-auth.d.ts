import 'next-auth'
import 'next-auth/jwt'
import type { DefaultSession } from 'next-auth'
import type { User as AppUser } from '@/@types/auth'
import type { Role } from '@/constants/roles.constant'

declare module 'next-auth' {
    interface Session {
        user:
            | (DefaultSession['user'] & {
                  id?: string | null
                  role?: Role
                  authority?: Role[]
              })
            | null
    }

    interface User extends AppUser {}
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string
        role?: Role
    }
}
