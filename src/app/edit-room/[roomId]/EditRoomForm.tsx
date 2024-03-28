"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState } from 'react'
import { Form } from "@/components/ui/form"
import { CustomFormField } from "@/components/form"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Room } from "@/db/schema"
import { editRoomAction } from "./action"
import { toast } from "@/components/ui/use-toast";
import { RotateCcw } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(10).max(250),
    githubRepo: z.string().min(10).max(250).startsWith("github.com"),
    tags: z.string().min(2).max(250),
})

type FormValues = z.infer<typeof formSchema>
const EditRoomForm = ({ room }: { room: Room }) => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: room.name,
            description: room.description,
            githubRepo: room.githubRepo as string | undefined,
            tags: room.tags,
        },
    });


    const formControl = form.control

    async function onSubmit(values: FormValues) {
        try {
            setIsLoading(true)
            await editRoomAction(room.id, values)
            router.push("/my-rooms")
            toast({
                title: "Updated Room",
                description: "You are successfully updated the room",
            })
        } catch (error) {
            toast({
                title: "Failed to update the room",
                description: "You are failed to update the room",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomFormField control={formControl} description="This is your public room name" name="name" label="Room Name" />
                <CustomFormField control={formControl} description="Please describe what you are be coding on" name="description" label="Room Description" />
                <CustomFormField control={formControl} description="Please put a link to the project you are working on" name="githubRepo" label="Github Repo" />
                <CustomFormField
                    control={formControl}
                    description="List your programming tags, frameworks, libraries so people can find you content"
                    name="tags"
                    label="Tags"
                />
                <Button aria-label="edit-form-submit" type="submit" disabled={isLoading}>
                    {
                        isLoading &&
                        <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    }
                    Submit
                </Button>
            </form>
        </Form>
    )
}

export default EditRoomForm