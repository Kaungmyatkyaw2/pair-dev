import { NoRoomsPlaceHolder, RoomCard, RoomSearchBar } from '@/components/room';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/auth';
import { getRooms } from '@/services/room';
import { MonitorPlay, Plus } from 'lucide-react';
import { unstable_noStore } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Home = async ({ searchParams }: { searchParams: { search: string | undefined } }) => {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);
  const session = await getSession();

  return (
    <div className='md:px-10 py-10'>
      <div className='flex flex-wrap justify-between items-center mb-10'>
        <h1 className='font-bold text-2xl'>Dev Rooms</h1>
        <div className='flex gap-2'>

          {session &&
            <>
              <Button aria-label='to-my-rooms' variant={"outline"} asChild>
                <Link href='/my-rooms'>
                  <MonitorPlay className="mr-2 h-4 w-4" /> My Rooms
                </Link>
              </Button>
              <Button aria-label='to-create-room' asChild>
                <Link href='/create-room'>
                  <Plus className="mr-2 h-4 w-4" /> Create Room
                </Link>
              </Button>
            </>
          }
        </div>
      </div>
      <div className='mb-10'>
        <RoomSearchBar />
      </div>
      <div className='flex gap-8 flex-wrap'>
        {
          rooms.map(el => <RoomCard room={el} key={el.id} />)
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