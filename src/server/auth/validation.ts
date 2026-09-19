import { z } from 'zod'
import { PUBLIC_SIGN_UP_ROLES } from '@/constants/roles.constant'

const normalizedEmail = z
    .email('Enter a valid email address.')
    .transform((email) => email.trim().toLowerCase())

export const signUpSchema = z.object({
    userName: z.string().trim().min(1, 'Enter your name.').max(100),
    email: normalizedEmail,
    password: z
        .string()
        .min(12, 'Password must contain at least 12 characters.')
        .max(128),
    role: z.enum(PUBLIC_SIGN_UP_ROLES),
})

export const profileUpdateSchema = z.object({
    name: z.string().trim().min(1, 'Enter your name.').max(100),
})
