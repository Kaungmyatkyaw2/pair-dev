"use client"

import React from 'react'
import { ThemeModeToggler } from '../theme'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import AccountDropDown from './AccountDropDown'




export const Header = () => {

    const { data: session } = useSession()

    const handleSignIn = () => {
        signIn("google")
    }


    return (
        <header className='container mx-auto  bg-white/30 dark:bg-slate-800/30  z-[9] backdrop-blur-sm border-b shadow-sm'>
            <div className='w-full flex items-center justify-between py-4'>
                <h1 className='font-bold text-xl'>PairDev</h1>
                <div className='flex items-center gap-4'>
                    {
                        session ?
                            <AccountDropDown />
                            :
                            <Button onClick={handleSignIn}>
                                Sign In
                            </Button>
                    }
                    <ThemeModeToggler />
                </div>
            </div>
        </header>
    )
}
