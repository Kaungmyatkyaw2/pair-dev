import React from 'react'
import { Badge } from '../ui/badge'

export const splitTagString = (str: string) => {
    return str.split(',').map(el => el.trim())
}

export const TagsList = ({ tags }: { tags: string[] }) => {
    return (
        <div className='flex gap-2 flex-wrap'>
            {
                tags.map(tag => <Badge className='w-fit'>{tag}</Badge>)
            }
        </div>
    )
}
