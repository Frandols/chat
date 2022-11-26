import EVENTS from '../config/events'

import {
    RoomItem,
    CreateRoom
} from '../components'

import { useSockets } from '../context/socket'

import './RoomList.css'

const RoomList = () => {
    const { 
        socket,
        rooms 
    } = useSockets()

    const handleJoinRoom = (id: string) => {
        if(!id) return

        socket.emit(
            EVENTS.CLIENT.JOIN_ROOM,
            id
        )
    }

    return (
        <ul
            className='room-list'>
            {
                Object
                .keys(rooms)
                .map(
                    (
                        key,
                        index
                    ) => <RoomItem
                        key={key}
                        index={index}
                        name={rooms[key].name}
                        onClick={
                            () => handleJoinRoom(key)
                        }
                    />
                )
            }
            <CreateRoom/>
        </ul>
    )
}

export default RoomList