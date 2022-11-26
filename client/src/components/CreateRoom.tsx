import EVENTS from '../config/events'

import {
    useRef,
    FormEventHandler 
} from 'react'
import {
    AnimatePresence,
    motion
} from 'framer-motion'

import {
    Input,
    Button
} from '../components'

import useModal from '../hooks/useModal'

import { useSockets } from '../context/socket'

import { X } from 'react-feather'

import './CreateRoom.css'

import { CreateRoomComponentAnimations } from '../animations'

const CreateRoom = () => {
    const roomNameRef = useRef(null)

    const { socket } = useSockets()

    const {
        visible,
        open,
        close
    } = useModal()
    
    const handleCreateRoom: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault()

        const form = event.target as HTMLFormElement
        const data = new FormData(form)

        const roomName = data.get('roomName')

        if(!roomName) return

        socket.emit(
            EVENTS.CLIENT.CREATE_ROOM,
            roomName
        )

        form.reset()

        close()
    }

    return (
        <>
            <li
                className='create-room'>
                <Button
                    onClick={open}
                    variant='secondary'>
                    New room
                </Button>
            </li>
            <AnimatePresence>
                {
                    visible
                    ? <motion.div
                        className='create-room-background'
                        variants={CreateRoomComponentAnimations.background}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'>
                        <motion.div
                            className='create-room-modal'
                            variants={CreateRoomComponentAnimations.modal}
                            initial='hidden'
                            animate='visible'
                            exit='exit'>
                            <header
                                className='create-room-modal-header'>
                                <button
                                    className='create-room-modal-header-close'
                                    onClick={close}>
                                    <X 
                                        size={20} 
                                    />
                                </button>
                                <h1
                                    className='create-room-modal-header-title'>
                                    Create room
                                </h1>
                            </header>
                            <main
                                className='create-room-modal-main'>
                                <form
                                    className='create-room-modal-main-form'
                                    onSubmit={handleCreateRoom}>
                                    <Input
                                        id='roomName'
                                        name='roomName'
                                        placeholder='Room name...'
                                        ref={roomNameRef}
                                    />
                                    <Button
                                        type='submit'>
                                        Create room
                                    </Button>
                                </form>
                            </main>
                        </motion.div>
                    </motion.div>
                    : null
                }
            </AnimatePresence>
        </>
    )
}

export default CreateRoom