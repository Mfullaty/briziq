export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    token: string
    user: {
        userId: string
        userName: string
        authority: string[]
        avatar: string
        email: string
    }
}

export type SignUpResponse = {
    status: string
    message: string
}

export type SignUpCredential = {
    userName: string
    email: string
    password: string
    role: 'BUYER' | 'EXPORTER'
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    newPassword: string
    confirmPassword: string
    token: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    id?: string | null
    avatar?: string | null
    userName?: string | null
    email?: string | null
    role?: import('@/constants/roles.constant').Role
    authority?: import('@/constants/roles.constant').Role[]
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
