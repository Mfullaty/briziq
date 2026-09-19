'use client'

import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import SignUp from '@/components/auth/SignUp'
import { apiSignUp } from '@/services/AuthService'
import { useRouter } from 'next/navigation'
import type { OnSignUpPayload } from '@/components/auth/SignUp'
import type { AxiosError } from 'axios'

const SignUpClient = () => {
    const router = useRouter()

    const handlSignUp = async ({
        values,
        setSubmitting,
        setMessage,
    }: OnSignUpPayload) => {
        try {
            setSubmitting(true)
            await apiSignUp(values)
            toast.push(
                <Notification title="Account created!" type="success">
                    You can now sign in from our sign in page
                </Notification>,
            )
            router.push('/sign-in')
        } catch (error) {
            const response = (error as AxiosError<{ message?: string }>)
                .response
            setMessage(
                response?.data?.message ?? 'Unable to create your account.',
            )
        } finally {
            setSubmitting(false)
        }
    }

    return <SignUp onSignUp={handlSignUp} />
}

export default SignUpClient
