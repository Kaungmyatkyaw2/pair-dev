"use client"

import "@stream-io/video-react-sdk/dist/css/styles.css"
import { Room } from '@/db/schema';
import {
    Call,
    CallControls,
    CallParticipantsList,
    CallState,
    CallingState,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateStreamToken } from "@/services/stream";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY


interface Props {
    room: Room
}

export const RoomVideoPlayer = ({ room }: Props) => {

    const { data: session } = useSession()
    const [client, setClient] = useState<StreamVideoClient | null>(null)
    const [call, setCall] = useState<Call | null>(null)
    const router = useRouter()


    useEffect(() => {


        if (!session || !room) {
            return;
        }


        const clientInstance = new StreamVideoClient({
            apiKey: apiKey!,
            user: {
                id: session.user.id,
                name: session.user.name || "Unknown",
                image: session.user.image!
            },
            tokenProvider: () => generateStreamToken(),
            options: {
                timeout: 6000
            }
        });
        const callInstace = clientInstance.call('default', room.id);
        callInstace.join({ create: true });

        setClient(clientInstance)
        setCall(callInstace)


        return () => {
            callInstace
                .leave()
                .then(() => clientInstance.disconnectUser())
                .catch(console.error);
        };
    }, [session?.user.id, room.id])


    const { useCallState } = useCallStateHooks()

    if (!client || !call) {
        return <h1>Loading....</h1>
    }

    return (
        <StreamVideo client={client}>
            <StreamTheme>
                <StreamCall call={call}>
                    <SpeakerLayout />
                    <div className="w-full overflow-x-scroll">
                        <CallControls onLeave={() => {
                            client.disconnectUser()
                            router.push("/rooms")
                        }} />
                    </div>
                    <CallParticipantsList onClose={() => undefined} />
                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
};