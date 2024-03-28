"use client"

import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { AccountDeleteDialog } from './AccountDeleteDialog'

const AccountDropDown = () => {

    const { data: session } = useSession()
    const [openDelAcc, setOpenDelAcc] = useState(false);

    const handleSignOut = () => {
        signOut({
            callbackUrl: "/"
        })
    }


    return (
        <>
            <AccountDeleteDialog setOpen={setOpenDelAcc} open={openDelAcc} />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div
                        className='flex items-center px-4 p-2 border rounded-[6px] bg-slate-100 dark:bg-slate-800'
                    >
                        <Avatar className='w-[35px] h-[35px] md:mr-2'>
                            <AvatarImage alt='profile picture' src={session?.user.image as string} />
                            <AvatarFallback>{session?.user.name}</AvatarFallback>
                        </Avatar>
                        <span className='md:flex hidden text-sm'>
                            {session?.user.name}
                        </span>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
                        <LogOut className='mr-3' size={18} />
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenDelAcc(true)} className='cursor-pointer'>
                        <Trash className='mr-3' size={18} />
                        Delete Acc
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default AccountDropDown