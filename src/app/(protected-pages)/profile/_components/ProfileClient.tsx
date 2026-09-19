'use client'

import { useEffect, useState } from 'react'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import {
    apiGetProfile,
    apiUpdateProfile,
    type Profile,
} from '@/services/ProfileService'

const ProfileClient = () => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        apiGetProfile()
            .then((data) => {
                setProfile(data)
                setName(data.name)
            })
            .catch(() => setMessage('Unable to load your profile.'))
    }, [])

    async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSaving(true)
        setMessage('')
        try {
            const updatedProfile = await apiUpdateProfile({ name })
            setProfile(updatedProfile)
            setName(updatedProfile.name)
            setMessage('Profile updated.')
        } catch {
            setMessage(
                'Unable to update your profile. Check your name and try again.',
            )
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Card className="max-w-xl">
            <h3 className="mb-6">Your profile</h3>
            {message && (
                <Alert
                    className="mb-4"
                    type={message === 'Profile updated.' ? 'success' : 'danger'}
                >
                    {message}
                </Alert>
            )}
            <form onSubmit={saveProfile} className="space-y-5">
                <label className="block">
                    <span className="mb-2 block font-semibold">Name</span>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                    />
                </label>
                <label className="block">
                    <span className="mb-2 block font-semibold">Email</span>
                    <Input value={profile?.email ?? ''} disabled />
                </label>
                <label className="block">
                    <span className="mb-2 block font-semibold">Role</span>
                    <Input value={profile?.role ?? ''} disabled />
                </label>
                <Button
                    type="submit"
                    variant="solid"
                    loading={isSaving}
                    disabled={!profile}
                >
                    Save profile
                </Button>
            </form>
        </Card>
    )
}

export default ProfileClient
