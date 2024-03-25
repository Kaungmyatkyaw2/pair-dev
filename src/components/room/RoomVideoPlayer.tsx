"use client"

import "@stream-io/video-react-sdk/dist/css/styles.css"
import { Room } from '@/db/schema';
import {
    Call,
    CallControls,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateStreamToken } from "@/services/stream";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjAxMmExZDktODY0Ny00YjUzLWJkNDMtZDBiMWNiZmE4M2ViIn0.hdGHNv1-7RSpX_HVvfnzNLTGuYSmxkJNe0p57Iuestk';
const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY


interface Props {
    room: Room
}

export const RoomVideoPlayer = ({ room }: Props) => {

    const { data: session } = useSession()
    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call | null>(null)


    useEffect(() => {


        if (!session || !room) {
            return;
        }


        const client = new StreamVideoClient({
            apiKey: apiKey!,
            user: { id: session.user.id },
            tokenProvider: () => generateStreamToken(),
            options: {
                timeout: 6000
            }
        });
        const call = client.call('default', room.id);
        call.join({ create: true });

        setClient(client)
        setCall(call)


        return () => {
            call
                .leave()
                .then(() => client.disconnectUser())
                .catch(console.error);
        };
    }, [session, room])



    if (!client || !call) {
        return <h1>Something went wrong try again later</h1>
    }

    return (
        <StreamVideo client={client}>
            <StreamTheme>
                <StreamCall call={call}>
                    <SpeakerLayout />
                    <CallControls />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
};