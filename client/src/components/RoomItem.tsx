import type { MouseEventHandler } from 'react'

import { motion } from 'framer-motion'

import './RoomItem.css'

import { RoomItemComponentAnimations } from '../animations'

type RoomItemProps = {
    index: number
    name: string
    onClick: MouseEventHandler<HTMLLIElement>
}

const RoomItem = ({
    index,
    name,
    onClick 
}: RoomItemProps) => {
    return (
        <motion.li
            className='room-item'
            onClick={onClick}
            variants={RoomItemComponentAnimations.item}
            initial='hidden'
            animate='visible'
            transition={{
                duration: .2,
                type: 'spring',
                damping: 30,
                delay: index * .2
            }}>
            <img
                src='assets/chat.png'
                alt='Chat Logo'
                width={40}
                height={40}
            />
            {name}
        </motion.li>
    )
}

export default RoomItem