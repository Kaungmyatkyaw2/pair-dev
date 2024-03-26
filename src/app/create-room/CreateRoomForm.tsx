"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState } from 'react'
import { Form } from "@/components/ui/form"
import { CustomFormField } from "@/components/form"
import { Button } from "@/components/ui/button"
import { createRoomAction } from "./actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { RotateCcw } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(250),
    githubRepo: z.string().min(2).max(50),
    tags: z.string().min(2).max(50),
})

type FormValues = z.infer<typeof formSchema>
const CreateRoomForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            githubRepo: "",
            tags: "",
        },
    });


    const formControl = form.control

    async function onSubmit(values: FormValues) {
        try {
            setIsLoading(true)
            const room = await createRoomAction(values)
            router.push(`/rooms/${room.id}`)
            toast({
                title: "Created Room",
                description: "You are successfully created the room",
            })
        } catch (error) {
            toast({
                title: "Failed to create the room",
                description: "You are failed to create the room",
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
                <Button aria-label="create-form-submit" type="submit" disabled={isLoading}>
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

export default CreateRoomForm