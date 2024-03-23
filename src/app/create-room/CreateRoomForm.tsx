"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import { Form, FormField } from "@/components/ui/form"
import { CustomFormField } from "@/components/form"
import { Button } from "@/components/ui/button"
import { createRoomAction } from "./actions"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(250),
    githubRepo: z.string().min(2).max(50),
    language: z.string().min(2).max(50),
})

type FormValues = z.infer<typeof formSchema>
const CreateRoomForm = () => {

    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            githubRepo: "",
            language: "",
        },
    });


    const formControl = form.control

    async function onSubmit(values: FormValues) {
        await createRoomAction(values)
        router.push("/")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomFormField control={formControl} description="This is your public room name" name="name" label="Room Name" />
                <CustomFormField control={formControl} description="Please describe what you are be coding on" name="description" label="Room Description" />
                <CustomFormField control={formControl} description="Please put a link to the project you are working on" name="githubRepo" label="Github Repo" />
                <CustomFormField
                    control={formControl}
                    description="List your programming languages, frameworks, libraries so people can find you content"
                    name="language"
                    label="Programming Languages"
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default CreateRoomForm