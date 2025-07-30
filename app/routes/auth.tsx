import React from 'react'
import { usePuterStore } from '~/lib/puter'

export const meta = () => ([
    {title: "Resumind | Auth"},
    {name: "Description", content: "Log into your account"}
])

const auth = () => {

    const { isLoading } = usePuterStore()

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className='gradient-border shadow-lg'>
                <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
                    <div className='flex flex-col items-center gap-2 text-center'>
                        <h1>Welcome</h1>
                        <h2>Log In to continue Your Job Journey</h2>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default auth
