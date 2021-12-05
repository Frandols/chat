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
    logger.info('Sockets enabled.')

    io.on(
        EVENTS.CONNECTION, 
        (socket: Socket) => {
            logger.info(`User connected ${socket.id}`)

            // Send actual rooms.
            socket.emit(
                EVENTS.SERVER.ROOMS, 
                rooms
            )

            // When a user creates a new room.
            socket.on(
                EVENTS.CLIENT.CREATE_ROOM, 
                roomName => {
                    logger.info(`New room "${roomName}" created.`)

                    // Create room id.
                    const roomId = nanoid()

                    // Save new room in rooms object.
                    rooms[roomId] = {
                        name: roomName
                    }

                    socket.join(roomId)

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
                        roomId
                    )
                }
            )

            // When a user joins a room.
            socket.on(
                EVENTS.CLIENT.JOIN_ROOM,
                roomId => {
                    logger.info(`New user has joined to "${rooms[roomId].name}" room.`)

                    socket.join(roomId)

                    socket.emit(
                        EVENTS.SERVER.ROOM_JOINED, 
                        roomId
                    )
                }
            )

            // When a user leaves a room
            socket.on(
                EVENTS.CLIENT.LEAVE_ROOM,
                roomId => {
                    logger.info(`A user has leaved "${rooms[roomId].name}" room.`)

                    socket.leave(roomId)

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