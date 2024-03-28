"use client"
import 'stream-chat-react/dist/css/v2/index.css';
import { Room } from '@/db/schema'
import { generateStreamToken } from '@/services/stream'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { StreamChat, Channel as StreamChannel } from 'stream-chat'
import {
    Channel,
    Chat,
    MessageInput,
    MessageList,
    Window,
    useMessageContext,
} from 'stream-chat-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useTheme } from "next-themes"




interface Props {
    room: Room
}


const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY

const CustomMessage = () => {
    const { message } = useMessageContext();
    return (
        <div className='flex items-center gap-2 mb-6'>
            <Avatar className='w-[55px] h-[55px] md:mr-2'>
                <AvatarImage alt='profile picture' src={message.user?.image} />
                <AvatarFallback>{message.user?.name?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className='space-y-[2px]'>
                <h2 className='font-bold'>
                    {message.user?.name}
                </h2>
                <span className='text-sm'>
                    {message.text}
                </span>
            </div>
        </div>
    );
};

const RoomChat = ({ room }: Props) => {

    const { data: session } = useSession()
    const [chatClient, setChatClient] = useState<StreamChat | null>(null)
    const [channel, setChannel] = useState<StreamChannel | null>();

    const { theme } = useTheme()

    useEffect(() => {


        if (!session || !room) {
            return;
        }


        async function init() {

            if (!session || !room) {
                return;
            }

            const user = {
                id: session.user.id,
                name: session.user.name || "Unknown",
                image: session.user.image!
            }
            const clientInstance = StreamChat.getInstance(apiKey!);
            await clientInstance.connectUser(user, await generateStreamToken());


            const channel = clientInstance.channel("livestream", room.id, {
                name: room.name,
                members: [session.user.id]
            })

            await channel.watch()

            setChannel(channel)
            setChatClient(clientInstance)
        }

        init()


        return () => {
            if (chatClient) {
                chatClient.disconnectUser()
            }
        };
    }, [session?.user.id, room.id])




    if (!chatClient || !channel) {
        return <h1>Something comming</h1>
    }

    return (
        <div className='max-h-[500px] h-[500px]'>
            <Chat client={chatClient} theme={theme == "dark" ? "str-chat__theme-dark" : 'str-chat__theme-light'}>
                <Channel channel={channel}>
                    <Window>
                        <MessageList Message={CustomMessage} />
                        <MessageInput focus />
                    </Window>
                </Channel>
            </Chat>
        </div>
    )
}

export { RoomChat }