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
import { ChevronRight, Github } from "lucide-react"
import Link from "next/link"
import { TagsList, splitTagString } from "../tags"


interface Props {
    room: Room
}

export function RoomCard({ room }: Props) {
    return (
        <Card className="md:w-[350px] w-full">
            <CardHeader>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent>

                <TagsList tags={splitTagString(room.tags)} />

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button asChild>
                    <Link href={`/rooms/${room.id}`}>
                        Join <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                {
                    room.githubRepo &&
                    <Button size={"icon"} variant={"outline"} asChild><Link href={room.githubRepo} target="_blank"><Github className="h-5 w-5" /></Link></Button>
                }
            </CardFooter>
        </Card>
    )
}
