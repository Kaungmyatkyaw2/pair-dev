"use client"

import React from 'react'
import { ThemeModeToggler } from '../theme'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'

export const Header = () => {

    const { data: session } = useSession()

    const handleSignIn = () => {
        signIn("google")
    }

    const handleSignOut = () => {
        signOut()
    }

    return (
        <div>
            {
                session ?
                    <Button onClick={handleSignOut}>Sign Out</Button>
                    :
                    <Button onClick={handleSignIn}>Sign in</Button>
            }
            <ThemeModeToggler />
        </div>
    )
}
