import { EVENTS } from '../config'

import type { 
    Server,
    Socket
} from 'socket.io'

import { nanoid } from 'nanoid'

import { 
    User,
    Room
} from './models'

import { 
    users,
    rooms 
} from './database'

import { logger } from './utilities'

const socket = ({ io }: { io: Server }) => {
    logger.info('Sockets enabled')

    io.on(
        EVENTS.CONNECT, 
        (socket: Socket) => {
            const user: User = { id: socket.id }
            
            users.set(user)

            logger.info(`"${user.id}" connected`)

            // Send actual rooms.
            socket.emit(
                EVENTS.SERVER.ROOMS, 
                rooms.get()
            )

            // When a user sets his name
            socket.on(
                EVENTS.CLIENT.SET_NAME,
                name => {
                    user.name = name

                    logger.info(`"${user.id}" set his name to "${user.name}"`)

                    socket.emit(
                        EVENTS.SERVER.NAME_SETTED,
                        user.name
                    )
                }
            )

            // When a user creates a new room.
            socket.on(
                EVENTS.CLIENT.CREATE_ROOM, 
                name => {
                    const room = {
                        id: nanoid(),
                        name
                    }

                    rooms.set(room)

                    logger.info(`${user.name} created "${room.name}"`)

                    socket.join(room.id)

                    // Send updated rooms to all users connected.
                    socket
                    .broadcast
                    .emit(
                        EVENTS.SERVER.ROOMS, 
                        rooms.get()
                    )

                    // Send updated rooms to new room creator.
                    socket.emit(
                        EVENTS.SERVER.ROOMS, 
                        rooms.get()
                    )

                    // Send room creator the id of the of the room created
                    socket.emit(
                        EVENTS.SERVER.ROOM_JOINED, 
                        room.id
                    )
                }
            )

            // When a user joins a room.
            socket.on(
                EVENTS.CLIENT.JOIN_ROOM,
                id => {
                    const room = rooms.get(id) as Room

                    socket.join(room.id)

                    logger.info(`${user.name} joined "${room.name}"`)

                    socket.emit(
                        EVENTS.SERVER.ROOM_JOINED, 
                        room.id
                    )
                }
            )

            // When a user leaves a room
            socket.on(
                EVENTS.CLIENT.LEAVE_ROOM,
                id => {
                    const room = rooms.get(id) as Room

                    socket.leave(room.id)

                    logger.info(`${user.name} left "${room.name}"`)

                    socket.emit(EVENTS.SERVER.ROOM_LEFT)
                }
            )

            // When a user sends a message in a room.
            socket.on(
                EVENTS.CLIENT.SEND_MESSAGE,
                ({
                    room,
                    message
                }) => {
                    const date = new Date()

                    socket
                    .to(room)
                    .emit(
                        EVENTS.SERVER.MESSAGE_SENDED, 
                        {
                            message,
                            user,
                            time: `${date.getHours()}:${date.getMinutes()}`
                        }
                    )
                }
            )

            socket.on(
                EVENTS.DISCONNECT,
                () => {
                    users.delete(user.id)

                    logger.info(`${user.name ? user.name : `"${user.id}"`} disconnected`)
                }
            )
        }
    )
}

export default socket