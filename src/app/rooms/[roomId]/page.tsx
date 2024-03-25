import { RoomVideoPlayer } from '@/components/room/RoomVideoPlayer'
import { TagsList, splitTagString } from '@/components/tags'
import { Button } from '@/components/ui/button'
import { getRoomById } from '@/services/room'
import { Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {
  params: { roomId: string }
}

const RoomPage = async ({ params }: Props) => {
  const roomId = params.roomId

  const room = await getRoomById(roomId)

  if (!room) {
    return <div className=''>There is no room with this ID.</div>
  }

  return (
    <div className='container mx-auto '>
      <div className='grid grid-cols-6 h-screen py-5 gap-4'>
        <div className='col-span-4'>
          <div className='rounded-sm border bg-card text-card-foreground shadow-sm p-4'>
            <RoomVideoPlayer room={room} />
          </div>
        </div>
        <div className='col-span-2'>
          <div className='rounded-sm border bg-card text-card-foreground shadow-sm p-4 space-y-2'>
            <h1 className='font-bold'>{room.name}</h1>
            <p className='text-sm text-gray-500'>{room.description}</p>
            <div className='pt-2 space-y-4'>
              <div>
                <TagsList tags={splitTagString(room.tags)} />
              </div>
              {room.githubRepo &&
                <Button className='w-full' variant={"secondary"} asChild>
                  <Link target='_blank' href={room.githubRepo}>
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </Link>
                </Button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomPage