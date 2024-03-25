import { RoomCard, RoomSearchBar } from '@/components/room';
import { Button } from '@/components/ui/button';
import { getRooms } from '@/services/room';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Home = async ({ searchParams }: { searchParams: { search: string | undefined } }) => {

  const rooms = await getRooms(searchParams.search)

  return (
    <div className='container mx-auto p-10'>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='font-bold text-2xl'>Dev Rooms</h1>
        <Button variant={"outline"} asChild>
          <Link href='/create-room'>
            <Plus className="mr-2 h-4 w-4" /> Create Room
          </Link>
        </Button>
      </div>
      <RoomSearchBar />
      <div className='flex gap-8 flex-wrap'>
        {
          rooms.map(el => <RoomCard room={el} key={el.id} />)
        }
      </div>
    </div>
  )
}

export default Home