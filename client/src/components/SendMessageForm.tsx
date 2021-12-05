import { useRef } from 'react'
import EVENTS from '../config/events'
import './SendMessageForm.css'

import { useSockets } from '../context/socket.context'

const SendMessageForm = () => {
    const newMessageRef = useRef(null)

    const {
        socket,
        roomId,
        username,
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
                roomId,
                message,
                username
            }
        )

        const date = new Date()

        setMessages([
            ...messages,
            {
                username: "You",
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
            <input
                className="send-message-form-input"
                placeholder="Message..."
                ref={newMessageRef}
            />
            <button
                className="send-message-form-button"
                type="submit">
                Send
            </button>
        </form>
    )
}

export default SendMessageForm