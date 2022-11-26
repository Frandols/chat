import { 
    useEffect, 
    useRef 
} from 'react'

import { Message } from '../components'

import { useSockets } from '../context/socket'

import './Messages.css' 

const Messages = () => {
    const messagesRef = useRef(null)

    const { messages } = useSockets()

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
    
    return (
        <div
            className="messages"
            ref={messagesRef}>
            {
                messages.map(
                    (
                        message, 
                        index
                    ) => <Message
                        key={index}
                        {...message}
                    />
                )
            }
        </div>
    )
}

export default Messages