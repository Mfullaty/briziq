import NextAuth from 'next-auth'
import authConfig from '@/configs/auth.config'
import {
    authRoutes,
    protectedRoutes,
    publicRoutes,
} from '@/configs/routes.config'
import appConfig from '@/configs/app.config'

const { auth } = NextAuth(authConfig)
const apiAuthPrefix = `${appConfig.apiPrefix}/auth`

export default auth((request) => {
    const { nextUrl } = request
    const path = nextUrl.pathname
    const isSignedIn = Boolean(request.auth)
    const isApiAuthRoute = path.startsWith(apiAuthPrefix)
    const isPublicRoute = path in publicRoutes
    const isAuthRoute = path in authRoutes

    if (isApiAuthRoute || isPublicRoute || path === '/access-denied') return

    if (isAuthRoute) {
        return isSignedIn
            ? Response.redirect(
                  new URL(appConfig.authenticatedEntryPath, nextUrl),
              )
            : undefined
    }

    const route = protectedRoutes[path]
    if (!route) return

    if (!isSignedIn) {
        const signInUrl = new URL(appConfig.unAuthenticatedEntryPath, nextUrl)
        signInUrl.searchParams.set('callbackUrl', `${path}${nextUrl.search}`)
        return Response.redirect(signInUrl)
    }

    const role = request.auth?.user?.role
    if (
        route.authority.length > 0 &&
        (!role || !route.authority.includes(role))
    ) {
        return Response.redirect(new URL('/access-denied', nextUrl))
    }
})

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
