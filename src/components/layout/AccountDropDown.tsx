"use client"

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

const AccountDropDown = () => {

    const { data: session } = useSession()

    const handleSignOut = () => {
        signOut()
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={"secondary"}>
                    <Avatar className='w-[35px] h-[35px] md:mr-2'>
                        <AvatarImage src={session?.user.image as string} />
                        <AvatarFallback>{session?.user.name}</AvatarFallback>
                    </Avatar>
                    <span className='md:flex hidden'>
                        {session?.user.name}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
                    <LogOut className='mr-3' size={18} />
                    Logout
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AccountDropDown