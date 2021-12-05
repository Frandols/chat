import { 
    useEffect, 
    useRef 
} from 'react'

import './Messages.css' 

import Message from './Message'

import { useSockets } from '../context/socket.context'

const Messages = () => {
    const messagesRef = useRef(null)

    const {
        roomId,
        messages
    } = useSockets()

    useEffect(
        () => {
            if(messagesRef.current) {
                messagesRef
                .current
                .scrollTop = messagesRef
                .current
                .scrollHeight
            }
        }, 
        [messages]
    )

    if(!roomId) return <h1 className="join-message">Join a room to start.</h1>
    
    return (
        <div
            className="messages"
            ref={messagesRef}>
            {
                messages.map(
                    (message, i) => (
                        <Message
                            key={i}
                            message={message.message}
                            username={message.username}
                            time={message.time}
                            messageOut={message.messageOut || null}
                        />
                    )
                )
            }
        </div>
    )
}

export default Messages