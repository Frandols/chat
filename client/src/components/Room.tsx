import { motion } from 'framer-motion'

import {
    RoomHeader,
    Messages,
    SendMessage
} from '../components'

import './Room.css'

import { RoomComponentAnimations } from '../animations'

const Room = () => {
    return (
        <motion.div
            className='room'
            variants={RoomComponentAnimations.room}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <RoomHeader/>
            <Messages/>
            <SendMessage/>
        </motion.div>
    )
}

export default Room