import { nanoid } from 'nanoid'
import logger from './utils/logger'
import { 
    Server,
    Socket
} from 'socket.io'

const EVENTS = {
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
        JOIN_ROOM: "JOIN_ROOM",
        LEAVE_ROOM: "LEAVE_ROOM",
        SEND_MESSAGE: "SEND_MESSAGE"
    },
    SERVER: {
        ROOMS: "ROOMS",
        ROOM_JOINED: "ROOM_JOINED",
        ROOM_LEFT: "ROOM_LEFT",
        MESSAGE_SENDED: "MESSAGE_SENDED"
    },
    CONNECTION: "connection"
}

const rooms: Record<string, { name: string }> = {}

const socket = ({ io }: { io: Server }) => {
    logger.info('Sockets enabled')

    io.on(
        EVENTS.CONNECTION, 
        (socket: Socket) => {
            logger.info(`User "${socket.id}" connected`)

            // Send actual rooms.
            socket.emit(
                EVENTS.SERVER.ROOMS, 
                rooms
            )

            // When a user creates a new room.
            socket.on(
                EVENTS.CLIENT.CREATE_ROOM, 
                name => {
                    logger.info(`User "${socket.id}" created room "${name}"`)

                    // Create room id.
                    const id = nanoid()

                    // Save new room in rooms object.
                    rooms[id] = { name }

                    socket.join(id)

                    // Send updated rooms to all users connected.
                    socket
                    .broadcast
                    .emit(
                        EVENTS.SERVER.ROOMS, 
                        rooms
                    )

                    // Send updated rooms to new room creator.
                    socket.emit(
                        EVENTS.SERVER.ROOMS, 
                        rooms
                    )

                    // Send room creator the id of the of the room created
                    socket.emit(
                        EVENTS.SERVER.ROOM_JOINED, 
                        id
                    )
                }
            )

            // When a user joins a room.
            socket.on(
                EVENTS.CLIENT.JOIN_ROOM,
                id => {
                    logger.info(`User "${socket.id}" joined room "${rooms[id].name}"`)

                    socket.join(id)

                    socket.emit(
                        EVENTS.SERVER.ROOM_JOINED, 
                        id
                    )
                }
            )

            // When a user leaves a room
            socket.on(
                EVENTS.CLIENT.LEAVE_ROOM,
                id => {
                    logger.info(`User "${socket.id}" left room "${rooms[id].name}"`)

                    socket.leave(id)

                    socket.emit(EVENTS.SERVER.ROOM_LEFT)
                }
            )

            // When a user sends a message in a room.
            socket.on(
                EVENTS.CLIENT.SEND_MESSAGE,
                ({
                    roomId,
                    message,
                    username
                }) => {
                    const date = new Date()

                    socket
                    .to(roomId)
                    .emit(
                        EVENTS.SERVER.MESSAGE_SENDED, 
                        {
                            message,
                            username,
                            time: `${date.getHours()}:${date.getMinutes()}`
                        }
                    )
                }
            )
        }
    )
}

export default socket