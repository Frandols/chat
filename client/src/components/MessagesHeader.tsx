import './MessagesHeader.css'
import EVENTS from '../config/events'

import { useSockets } from '../context/socket.context'

const MessagesHeader = () => {
    const { 
        socket,
        rooms,
        roomId
    } = useSockets()

    const handleLeaveRoom = () => {
        return socket.emit(
            EVENTS.CLIENT.LEAVE_ROOM,
            roomId
        )
    }

    return (
        <header
            className="messages-header">
            <h3
                className="messages-header-title">
                {rooms[roomId].name}
            </h3>
            <button
                className="messages-header-button"
                onClick={handleLeaveRoom}>
                Leave room
            </button>
        </header>
    )
}

export default MessagesHeader