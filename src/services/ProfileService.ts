import ApiService from './ApiService'
import type { Role } from '@/constants/roles.constant'

export type Profile = { id: string; name: string; email: string; role: Role }

export function apiGetProfile() {
    return ApiService.fetchDataWithAxios<Profile>({
        url: '/profile',
        method: 'get',
    })
}

export function apiUpdateProfile(data: { name: string }) {
    return ApiService.fetchDataWithAxios<Profile, { name: string }>({
        url: '/profile',
        method: 'patch',
        data,
    })
}
