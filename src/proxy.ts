import NextAuth from 'next-auth'

import authConfig from '@/configs/auth.config'
import {
    authRoutes as _authRoutes,
    publicRoutes as _publicRoutes,
    protectedRoutes,
} from '@/configs/routes.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'

const { auth } = NextAuth(authConfig)

const publicRoutes = Object.entries(_publicRoutes).map(([key]) => key)
const authRoutes = Object.entries(_authRoutes).map(([key]) => key)

const apiAuthPrefix = `${appConfig.apiPrefix}/auth`

export default auth((req) => {
    const { nextUrl } = req
    const isSignedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    /** Skip auth middleware for api routes and public routes */
    if (isApiAuthRoute || isPublicRoute) return

    if (isAuthRoute) {
        if (isSignedIn) {
            /** Redirect to authenticated entry path if signed in & path is auth route */
            return Response.redirect(
                new URL(appConfig.authenticatedEntryPath, nextUrl),
            )
        }
        return
    }

    /** Redirect to unauthenticated entry path if NOT signed in & path is NOT public route */
    if (!isSignedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        return Response.redirect(
            new URL(
                `${appConfig.unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${callbackUrl}`,
                nextUrl,
            ),
        )
    }

    /** Role based access: only enforce when route defines required roles in `authority` */
    if (isSignedIn && nextUrl.pathname !== '/access-denied') {
        const routeMeta = protectedRoutes[nextUrl.pathname]
        const requiredRoles = routeMeta?.authority

        if (Array.isArray(requiredRoles) && requiredRoles.length > 0) {
            const userRoles = req.auth?.user?.authority ?? []
            const includedRole = requiredRoles.some((role) =>
                userRoles.includes(role),
            )

            if (!includedRole) {
                return Response.redirect(
                    new URL('/access-denied', nextUrl),
                )
            }
        }
    }
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)'],
}
