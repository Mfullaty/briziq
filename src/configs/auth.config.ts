import type { NextAuthConfig } from 'next-auth'
import validateCredential from '../server/actions/user/validateCredential'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import type { SignInCredential } from '@/@types/auth'
import { findOrCreateOAuthUser } from '@/server/auth/user-repository'

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_AUTH_CLIENT_ID,
            clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                /** validate credentials from backend here */
                const user = await validateCredential(
                    credentials as SignInCredential,
                )
                if (!user) {
                    return null
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (user?.email) {
                const persistedUser = await findOrCreateOAuthUser({
                    email: user.email.trim().toLowerCase(),
                    name: user.name?.trim() || user.email,
                })
                if (persistedUser) {
                    token.id = persistedUser.id
                    token.role = persistedUser.role
                    token.sub = persistedUser.id
                }
            }

            if (account?.provider === 'credentials' && user) {
                token.id = user.id
                token.role = user.role
                token.sub = user.id
            }
            return token
        },
        async session(payload) {
            return {
                ...payload.session,
                user: {
                    ...payload.session.user,
                    id: payload.token.id ?? payload.token.sub,
                    role: payload.token.role,
                    authority: payload.token.role ? [payload.token.role] : [],
                },
            }
        },
    },
} satisfies NextAuthConfig
