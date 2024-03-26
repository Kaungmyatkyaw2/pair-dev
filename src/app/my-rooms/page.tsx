import { NoRoomsPlaceHolder, RoomCard } from '@/components/room';
import { Button } from '@/components/ui/button';
import { getMyRooms } from '@/services/room';
import { HomeIcon, Plus } from 'lucide-react';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';
import React from 'react'

const Home = async () => {
    unstable_noStore();

    const rooms = await getMyRooms()

    return (
        <div className='p-10'>
            <div className='flex justify-between items-center mb-10'>
                <h1 className='font-bold text-2xl'>My Rooms</h1>
                <div className='flex gap-2 items-center'>
                    <Button size="icon" variant={"outline"} asChild>
                        <Link href='/rooms'>
                            <HomeIcon className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href='/create-room'>
                            <Plus className="mr-2 h-4 w-4" /> Create Room
                        </Link>
                    </Button>

                </div>
            </div>
            <div className='flex gap-8 flex-wrap'>
                {
                    rooms.map(el => <RoomCard key={el.id} room={el} showActionBtns />)
                }
                {
                    rooms.length == 0 &&
                    <NoRoomsPlaceHolder />
                }
            </div>
        </div>
    )
}

export default Home