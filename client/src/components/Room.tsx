import MessagesHeader from './MessagesHeader'
import Messages from './Messages'
import SendMessageForm from './SendMessageForm'

import './Room.css'

const Room = () => {
    return (
        <div
            className='room'>
            <MessagesHeader/>
            <Messages/>
            <SendMessageForm/>
        </div>
    )
}

export default Room