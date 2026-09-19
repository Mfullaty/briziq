import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { ROLES } from '@/constants/roles.constant'

export const protectedRoutes: Routes = {
    '/dashboard': {
        key: 'dashboard',
        authority: [
            ROLES.BUYER,
            ROLES.EXPORTER,
            ROLES.ADMIN,
            ROLES.VERIFICATION_OFFICER,
        ],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/profile': {
        key: 'profile',
        authority: [
            ROLES.BUYER,
            ROLES.EXPORTER,
            ROLES.ADMIN,
            ROLES.VERIFICATION_OFFICER,
        ],
        meta: { pageBackgroundType: 'plain', pageContainerType: 'contained' },
    },
}

export const publicRoutes: Routes = {
    '/': {
        key: 'home',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/design-system': {
        key: 'designSystem',
        authority: [],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
}

export const authRoutes = authRoute
