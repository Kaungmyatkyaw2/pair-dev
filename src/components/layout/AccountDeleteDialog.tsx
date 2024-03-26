"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { deleteMyAccount } from "@/services/user"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import { signOut } from "next-auth/react"
import { Dispatch, SetStateAction, useState } from "react"


interface Props extends DialogProps {
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function AccountDeleteDialog({ open, setOpen }: Props) {

    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await deleteMyAccount()
            signOut({ callbackUrl: "/" })
            setOpen(false)
        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={!isLoading ? setOpen : undefined}>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <Button
                        className={cn(buttonVariants())}
                        role="button"
                        disabled={isLoading}
                        onClick={handleDelete}
                    >
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
