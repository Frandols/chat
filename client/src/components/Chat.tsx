import { 
    AnimatePresence,
    motion 
} from 'framer-motion'

import {
    Menu,
    Room,
    NoRoom
} from '../components'

import { useSockets } from '../context/socket'

import './Chat.css'

import { ChatComponentAnimations } from '../animations'

const Chat = () => {
    const { room } = useSockets()

    return (
        <motion.div
            className='chat'
            variants={ChatComponentAnimations.chat}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ 
                duration: .2,
                type: 'spring',
                damping: 12.5
            }}>
            <Menu/>
            <AnimatePresence
                mode='wait'>
                {
                    room
                    ? <Room key='room' />
                    : <NoRoom key='noRoom' />
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default Chat