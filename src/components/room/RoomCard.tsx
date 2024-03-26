import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema"
import { ChevronRight, Github, Pen, Trash } from "lucide-react"
import Link from "next/link"
import { TagsList } from "../tags"
import { splitTagString } from "@/lib/utils"
import { RoomDeleteDialog } from "./RoomDeleteDialog"


interface Props {
    room: Room,
    showActionBtns?: boolean
}

export function RoomCard({ room, showActionBtns }: Props) {
    return (
        <Card className="md:w-[350px] w-full">
            <CardHeader>
                {showActionBtns &&
                    <div className="flex gap-2 justify-end mb-2">
                        <RoomDeleteDialog room={room} />
                        <Button aria-label="to-edit-room" size={"icon"} className="bg-blue-800 hover:bg-blue-900" variant={"destructive"} asChild>
                            <Link href={`/edit-room/${room.id}`}>
                                <Pen className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                }
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>

                <TagsList tags={splitTagString(room.tags)} />

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button aria-label="join-room" asChild>
                    <Link href={`/rooms/${room.id}`}>
                        Join <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                {
                    room.githubRepo &&
                    <Button aria-label="to-github" size={"icon"} variant={"outline"} asChild><Link href={room.githubRepo} target="_blank"><Github className="h-5 w-5" /></Link></Button>
                }
            </CardFooter>
        </Card>
    )
}
