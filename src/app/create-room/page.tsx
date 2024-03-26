import React from 'react'
import CreateRoomForm from './CreateRoomForm'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

const CreateRoom = () => {
    return (
        <div className='flex flex-col gap-8 py-12 md:px-10'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-4xl'>Create Room</h1>
                <Button size="icon" variant={"outline"} asChild>
                    <Link href='/rooms'>
                        <HomeIcon className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <CreateRoomForm />

        </div >
    )
}

export default CreateRoom