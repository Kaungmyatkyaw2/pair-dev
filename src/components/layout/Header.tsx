"use client"

import React from 'react'
import { ThemeModeToggler } from '../theme'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import AccountDropDown from './AccountDropDown'
import Image from 'next/image'
import Link from 'next/link'




export const Header = () => {

    const { data: session } = useSession()

    const handleSignIn = () => {
        signIn("google")
    }


    return (
        <header className='container mx-auto  bg-white/30 dark:bg-slate-800/30  z-[100] backdrop-blur-sm border-b shadow-sm'>
            <div className='w-full flex items-center justify-between py-4  z-[100]'>
                <Link href={"/"} className='flex justify-center items-center gap-2'>
                    <Image width={40} height={40} src={"/icon.svg"} alt="icon" />
                    <h1 className='font-bold text-xl'>PairDev</h1>
                </Link>
                <div className='flex items-center gap-4'>
                    {
                        session ?
                            <AccountDropDown />
                            :
                            <Button
                                aria-label="signin"
                                onClick={handleSignIn}>
                                Sign In
                            </Button>
                    }
                    <ThemeModeToggler />
                </div>
            </div>
        </header>
    )
}
