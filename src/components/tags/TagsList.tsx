"use client"

import React from 'react'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'



export const TagsList = ({ tags }: { tags: string[] }) => {

    const router = useRouter()

    return (
        <div className='flex gap-2 flex-wrap'>
            {
                tags.map(tag =>
                    <Badge key={tag}
                        role='button'
                        tabIndex={1}
                        onClick={() => {
                            router.push(`/rooms/?search=${tag}`)
                        }}
                        className='w-fit'>{tag}</Badge>)
            }
        </div>
    )
}
