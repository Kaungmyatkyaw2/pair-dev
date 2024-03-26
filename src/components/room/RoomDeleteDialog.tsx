"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Room } from "@/db/schema"
import { cn } from "@/lib/utils"
import { deleteRoomById } from "@/services/room"
import { Trash } from "lucide-react"
import { useState } from "react"

interface Props {
    room: Room
}

export function RoomDeleteDialog({ room }: Props) {

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await deleteRoomById(room.id)
            setOpen(false)
        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={!isLoading ? setOpen : undefined}>
            <AlertDialogTrigger asChild>
                <Button aria-label="delete-room" onClick={() => { setOpen(true) }} size={"icon"} variant={"destructive"}><Trash className="h-4 w-4" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        room.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <Button
                        aria-label="delete-room"
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
