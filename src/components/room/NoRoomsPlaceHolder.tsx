import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const NoRoomsPlaceHolder = () => {
    return (
        <div className="flex w-full flex-col justify-center items-center gap-4 my-16">
            <Image src="/no-data.svg" width={200} height={200} alt="no data found image" />
            <h2 className='text-center font-bold text-2xl'>There is no rooms yet!</h2>
            <Button asChild>
                <Link href='/create-room'>
                    <Plus className="mr-2 h-4 w-4" /> Create One
                </Link>
            </Button>
        </div>)
}
