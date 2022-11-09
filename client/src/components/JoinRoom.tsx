import { useRef } from 'react'
import EVENTS from '../config/events'

import './JoinRoom.css'

import { useSockets } from '../context/socket.context'

const JoinRoomForm = () => {
    const joinRoomNameRef = useRef(null)
    const createRoomNameRef = useRef(null)

    const {
        socket,
        username,
        rooms
    } = useSockets()

    const handleCreateRoom = () => {
        const roomName = createRoomNameRef.current.value

        if(!roomName) return

        return socket.emit(
            EVENTS.CLIENT.CREATE_ROOM,
            roomName
        )
    }
    
    const handleJoinRoom = () => {
        const id = joinRoomNameRef.current.value

        if(!id) return

        return socket.emit(
            EVENTS.CLIENT.JOIN_ROOM,
            id
        )
    }

    return (
        <div
            className="join-room-form">
            <h2
                className="join-room-form-title">
                {username}, select or create a room.
            </h2>
            <select
                className="join-room-form-select"
                ref={joinRoomNameRef}>
                <option
                    value="">
                    Select room...
                </option>
                {
                    Object
                    .keys(rooms)
                    .map(
                        key => <option 
                            className="join-room-form-select-option" 
                            key={key}
                            value={key}>
                            {rooms[key].name}
                        </option>
                    )
                }
            </select>
            <button
                className="join-room-form-button"
                onClick={handleJoinRoom}>
                Join room
            </button>
            <legend
                className="join-room-form-legend">
                or
            </legend>
            <input
                className="join-room-form-input"
                ref={createRoomNameRef}
                placeholder="Room name..."
            />
            <button
                className="join-room-form-button"
                onClick={handleCreateRoom}>
                Create room
            </button>
        </div>
    )
}

export default JoinRoomForm