import 'next-auth'
import type { User as AppUser } from '@/@types/auth'

declare module 'next-auth' {
  interface Session {
    user: (DefaultSession['user'] & {
      id?: string | null
      authority?: string[]
    }) | null
  }

  interface User extends AppUser {}
}