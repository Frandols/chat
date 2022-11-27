import { 
    SOCKET_URL, 
    EVENTS 
} from '../config'

import io, { Socket } from 'socket.io-client'

import { 
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'

interface Context {
    socket: Socket
    user?: string
    setUser: (user: string) => void
    messages: { 
        user: string
        message: string 
        time: string
        messageOut: boolean
    }[]
    setMessages: (messages: { 
        user: string
        message: string 
        time: string
        messageOut: boolean
    }[]) => void
    rooms: Record<string, {
        id: string
        name: string
    }>
    room?: string
}

const socket = io(SOCKET_URL)

const SocketContext = createContext<Context>({
    socket,
    setUser: () => {},
    setMessages: () => {},
    rooms: {},
    messages: []
})

const SocketContextProvider = (props: any) => {
    const [
        user, 
        setUser
    ] = useState(null)
    const [
        rooms, 
        setRooms
    ] = useState({})
    const [
        room, 
        setRoom
    ] = useState(null)
    const [
        messages, 
        setMessages
    ] = useState([])

    useEffect(
        () => {
            window.onfocus = () => document.title = 'Wazaa'
        }, 
        []
    )

    socket.on(
        EVENTS.SERVER.NAME_SETTED,
        name => {
            setUser(name)

            localStorage.setItem(
                'user', 
                name
            )
        }
    )

    socket.on(
        EVENTS.SERVER.ROOMS, 
        rooms => setRooms(rooms)
    )

    socket.on(
        EVENTS.SERVER.ROOM_JOINED,
        room => {
            setRoom(room)

            setMessages([])
        }
    )

    socket.on(
        EVENTS.SERVER.ROOM_LEFT,
        () => setRoom(null)
    )

    useEffect(
        () => {
            socket.on(
                EVENTS.SERVER.MESSAGE_SENDED,
                ({
                    message,
                    user,
                    time
                }) => {
                    if(!document.hasFocus()) document.title = 'Message received'
                
                    setMessages(
                        currentMessages => [
                            ...currentMessages,
                            { 
                                message,
                                user, 
                                time,
                                messageOut: false 
                            }
                        ]
                    )
                }
            )
        }, 
        []
    )

    return (
        <SocketContext.Provider
            value={{
                socket,
                rooms,
                room,
                user,
                setUsername: setUser,
                messages,
                setMessages
            }}
            {...props}
        />
    )
}

export const useSockets = () => useContext(SocketContext)

export default SocketContextProvider