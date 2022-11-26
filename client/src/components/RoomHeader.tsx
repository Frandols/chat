import EVENTS from '../config/events'

import {
    AnimatePresence,
    motion
} from 'framer-motion'

import { Button } from '../components'

import { useSockets } from '../context/socket'

import './RoomHeader.css'

import { RoomHeaderComponentAnimations } from '../animations'

const RoomHeader = () => {
    const { 
        socket,
        rooms,
        roomId
    } = useSockets()

    const handleLeaveRoom = () => socket.emit(
        EVENTS.CLIENT.LEAVE_ROOM,
        roomId
    )

    return (
        <header
            className='room-header'>
            <img
                src='assets/chat.png'
                alt='Chat Logo'
                width={40}
                height={40}
            />
            <AnimatePresence
                mode='wait'>
                <motion.h1
                    key={roomId}
                    variants={RoomHeaderComponentAnimations.title}
                    initial='hidden'
                    animate='visible'
                    exit='exit'>
                    {
                        roomId
                        ? rooms[roomId].name
                        : null
                    }
                </motion.h1>
            </AnimatePresence>
            <Button
                onClick={handleLeaveRoom}>
                Leave room
            </Button>
        </header>
    )
}

export default RoomHeader