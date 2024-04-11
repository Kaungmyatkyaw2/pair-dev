import {
    Call,
    CallControls,
    CallParticipantsList,
    CallingState,
    SpeakerLayout,
    StreamVideoClient,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from 'react'


interface Props {
    client: StreamVideoClient
}

const InnerCallVideoPlayer = ({ client }: Props) => {

    const router = useRouter()

    const { useCallCallingState } = useCallStateHooks()
    const callingState = useCallCallingState()


    if (callingState !== CallingState.JOINED) {
        return <div className="py-[30px] flex justify-center">
            <Loader size={30} className="animate-spin" />
        </div>
    }


    return (

        <>
            <SpeakerLayout />
            <div className="w-full overflow-x-scroll">
                <CallControls onLeave={() => {
                    client.disconnectUser()
                    router.push("/rooms")
                }} />
            </div>
            <CallParticipantsList onClose={() => undefined} />
        </>
    )

}

export default InnerCallVideoPlayer