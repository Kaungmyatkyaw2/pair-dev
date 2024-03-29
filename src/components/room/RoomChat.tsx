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
import { Button } from '../ui/button';
import { Download } from 'lucide-react';




interface Props {
    room: Room
}


const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY


function formatDateTo12Hour(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let suffix = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${suffix}`;
}


const CustomMessage = () => {
    const { message } = useMessageContext();
    const dateTimeStamp = Date.parse(message.created_at as string)
    const formattedCreatedAt = formatDateTo12Hour(new Date(dateTimeStamp))
    return (
        <div className='flex items-start gap-2 mb-6'>
            <Avatar className='w-[55px] h-[55px] md:mr-2'>
                <AvatarImage alt='profile picture' src={message.user?.image} />
                <AvatarFallback>{message.user?.name?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className='font-bold mb-1'>
                    {message.user?.name} <span className='text-gray-400 text-[12px] ml-2'>{formattedCreatedAt}</span>
                </h2>
                <p className='text-sm'>
                    {message.text}
                </p>
                <div className='mt-3'>
                    {message.attachments?.map((el, idx) => el.type == "image" ?
                        <img key={idx} src={el.image_url} alt="msg-attachment" /> :
                        <Button key={idx} variant={"outline"} asChild>
                            <a href={el.asset_url} target="_blank" rel="noopener noreferrer">
                                <Download className='mr-2 h-4 w-4' /> {el.title}
                            </a>
                        </Button>
                    )}
                </div>
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
        return <h1>Loading chat....</h1>
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