import React from 'react'
import CreateRoomForm from './CreateRoomForm'

const CreateRoom = () => {
    return (
        <div className='container mx-auto flex flex-col gap-8 pt-12 pb-12'>

            <h1 className='font-bold text-4xl'>Create Room</h1>

            <CreateRoomForm />

        </div >
    )
}

export default CreateRoom