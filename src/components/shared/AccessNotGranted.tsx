'use client'

import Link from 'next/link'
import Container from '@/components/shared/Container'
import appConfig from '@/configs/app.config'
import NoAccess from '@/assets/svg/NoAccess'

const AccessNotGranted = () => {
    return (
        <div className="flex flex-auto flex-col h-[100vh]">
            <div className="h-full bg-white dark:bg-gray-800">
                <Container className="flex flex-col flex-auto items-center justify-center min-w-0 h-full">
                    <div className="min-w-[320px] md:min-w-[500px] max-w-[500px]">
                        <div className="text-center">
                            <div className="mb-10 flex justify-center">
                                <NoAccess height={280} width={280} />
                            </div>
                            <h2 className="text-rose-600 dark:text-rose-500">
                                Ops! You don't have access to this page
                            </h2>
                            <p className="text-lg mt-6">
                                You don't have access to this page. We
                                suggest you to go back to the home page
                            </p>
                            <div className="mt-8">
                                <Link
                                    href={appConfig.authenticatedEntryPath}
                                    className="button inline-flex items-center justify-center bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 ring-primary dark:ring-white hover:border-primary dark:hover:border-white hover:ring-1 hover:text-primary dark:hover:text-white dark:hover:bg-transparent text-gray-600 dark:text-gray-100 h-14 rounded-xl px-8 py-2 text-base button-press-feedback"
                                >
                                    Back to Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default AccessNotGranted
