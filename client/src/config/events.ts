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

export default EVENTS