import { 
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import io, { Socket } from 'socket.io-client'
import { SOCKET_URL } from '../config/default'
import EVENTS from '../config/events'

interface Context {
    socket: Socket
    username?: string
    setUsername: Function
    messages?: { 
        message: string 
        time: string 
        username: string,
        messageOut?: boolean
    }[]
    setMessages: Function
    roomId?: string
    rooms: object
}

const socket = io(SOCKET_URL)

const SocketContext = createContext<Context>({
    socket,
    setUsername: () => false,
    setMessages: () => false,
    rooms: {},
    messages: []
})

const SocketsProvider = (props: any) => {
    const [
        username, 
        setUsername
    ] = useState('')
    const [
        room, 
        setRoom
    ] = useState('')
    const [
        rooms, 
        setRooms
    ] = useState({})
    const [
        messages, 
        setMessages
    ] = useState([])

    useEffect(() => {
        window.onfocus = () => document.title = 'Chat App | Francisco De Los Santos'
    }, [])

    socket.on(
        EVENTS.SERVER.ROOMS, 
        value => setRooms(value)
    )

    socket.on(
        EVENTS.SERVER.ROOM_JOINED,
        value => {
            setRoom(value)

            setMessages([])
        }
    )

    socket.on(
        EVENTS.SERVER.ROOM_LEFT,
        () => setRoom('')
    )

    useEffect(
        () => {
            socket.on(
                EVENTS.SERVER.MESSAGE_SENDED,
                ({
                    message,
                    username,
                    time
                }) => {
                    if(!document.hasFocus()) document.title = 'New message!'
                
                    setMessages(
                        messages => [
                            ...messages, 
                            { 
                                message, 
                                username, 
                                time 
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
                roomId: room,
                username,
                setUsername,
                messages,
                setMessages
            }}
            {...props}
        />
    )
}

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider