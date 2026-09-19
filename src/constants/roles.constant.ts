export const ROLES = {
    BUYER: 'BUYER',
    EXPORTER: 'EXPORTER',
    ADMIN: 'ADMIN',
    VERIFICATION_OFFICER: 'VERIFICATION_OFFICER',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const PUBLIC_SIGN_UP_ROLES = [ROLES.BUYER, ROLES.EXPORTER] as const
export const ADMIN = ROLES.ADMIN
export const USER = ROLES.BUYER
