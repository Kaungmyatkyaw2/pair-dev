import React from 'react'
import EditRoomForm from './EditRoomForm'
import { getRoomById } from '@/services/room'
import { unstable_noStore } from 'next/cache'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

const EditRoom = async ({ params }: { params: { roomId: string } }) => {
    unstable_noStore()
    const room = await getRoomById(params.roomId)

    if (!room) {
        return <h1>No data is found with this room ID!</h1>
    }

    return (
        <div className='flex flex-col gap-8 pt-12 pb-12'>

            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-4xl'>Edit Room</h1>
                <Button size="icon" variant={"outline"} asChild>
                    <Link href='/rooms'>
                        <HomeIcon className="h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <EditRoomForm room={room} />

        </div >)
}

export default EditRoom