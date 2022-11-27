import EVENTS from '../config/events'

import { useRef } from 'react'

import {
    Input,
    Button
} from '../components'

import { useSockets } from '../context/socket'

import './SendMessage.css'

const SendMessage = () => {
    const newMessageRef = useRef(null)

    const {
        socket,
        room,
        user,
        messages,
        setMessages
    } = useSockets()

    const handleSendMessage = e => {
        e.preventDefault()

        const message = newMessageRef.current.value

        if(!message) return

        socket.emit(
            EVENTS.CLIENT.SEND_MESSAGE,
            {
                room,
                message
            }
        )

        const date = new Date()

        setMessages([
            ...messages,
            {
                user,
                message,
                time: `${date.getHours()}:${date.getMinutes()}`,
                messageOut: true
            }
        ])

        newMessageRef.current.value = ""
    }
    
    return (
        <form
            className="send-message-form"
            onSubmit={handleSendMessage}>
            <Input
                placeholder='Message...'
                ref={newMessageRef}
            />
            <Button
                type='submit'>
                Send
            </Button>
        </form>
    )
}

export default SendMessage