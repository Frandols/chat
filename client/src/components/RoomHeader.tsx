import EVENTS from '../config/events'

import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '../components'

import { useSockets } from '../context/socket'

import chat from '../assets/chat.avif'

import './RoomHeader.css'

import { RoomHeaderComponentAnimations } from '../animations'

const RoomHeader = () => {
  const { socket, room, rooms } = useSockets()

  const handleLeaveRoom = () => socket.emit(EVENTS.CLIENT.LEAVE_ROOM, room)

  return (
    <header className="room-header">
      <img src={chat} alt="Chat Logo" width={40} height={40} />
      <AnimatePresence mode="wait">
        <motion.h1
          key={room}
          variants={RoomHeaderComponentAnimations.title}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {room ? rooms[room].name : null}
        </motion.h1>
      </AnimatePresence>
      <Button onClick={handleLeaveRoom}>Leave room</Button>
    </header>
  )
}

export default RoomHeader
