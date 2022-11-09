import JoinRoomForm from './JoinRoomForm'
import MessagesHeader from './MessagesHeader'
import Messages from './Messages'
import SendMessageForm from './SendMessageForm'

import { useSockets } from '../context/socket.context'

const Chat = () => {
    const { roomId } = useSockets()

    return (
        <div
            className='chat'>
            {
                roomId
                ? <>
                    <MessagesHeader/>
                    <Messages/>
                    <SendMessageForm/>
                </>
                : <JoinRoomForm/>
            }
        </div>
    )
}

export default Chat