import { motion } from 'framer-motion'

import './NoRoom.css'

import { NoRoomComponentAnimations } from '../animations'

const NoRoom = () => {
    return (
        <motion.div
            className='no-room'
            variants={NoRoomComponentAnimations.container}
            initial='visible'
            exit='exit'>
            <motion.img
                src='assets/emoji.png'
                alt='Star Eyes Emoji'
                width={150}
                height={150}
                variants={NoRoomComponentAnimations.emoji}
                initial='hidden'
                animate='visible'
            />
            <motion.h1
                variants={NoRoomComponentAnimations.title}
                initial='hidden'
                animate='visible'>
                Let's chat
            </motion.h1>
            <motion.p
                variants={NoRoomComponentAnimations.paragraph}
                initial='hidden'
                animate='visible'>
                Choose a room or create one to start chatting with other users
            </motion.p>
        </motion.div>
    )
}

export default NoRoom