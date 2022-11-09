import JoinRoomForm from './JoinRoom'
import Room from './Room'

import { useSockets } from '../context/socket.context'

const Chat = () => {
    const { roomId } = useSockets()

    return (
        <div
            className='chat'>
            {
                roomId
                ? <Room/>
                : <JoinRoomForm/>
            }
        </div>
    )
}

export default Chat