import { motion } from 'framer-motion'

import {
    Toolbar,
    RoomList
} from '../components'

import { useSockets } from '../context/socket'

import './Menu.css'

import { MenuComponentAnimations } from '../animations'

const Menu = () => {
    const { room } = useSockets()

    return (
        <motion.div
            className='menu'
            variants={MenuComponentAnimations.menu}
            animate={
                room
                ? 'hidden'
                : 'visible'
            }
            transition={{
                duration: .2,
                type: 'spring',
                damping: 30
            }}>
            <Toolbar/>
            <RoomList/>
        </motion.div>
    )
}

export default Menu