import './App.css'

import LogInForm from './components/LogInForm'
import JoinRoomForm from './components/JoinRoomForm'
import MessagesHeader from './components/MessagesHeader'
import Messages from './components/Messages'
import SendMessageForm from './components/SendMessageForm'

import { useSockets } from './context/socket.context'

const App = () => {
    const {
        username,
        roomId
    } = useSockets()

    return (
        <main
            className="site-main">
            {
                username &&
                (
                    roomId ?
                    <>
                        <MessagesHeader/>
                        <Messages/>
                        <SendMessageForm/>
                    </>
                    :
                    <JoinRoomForm/>
                )
            }
            {
                !username &&
                <LogInForm/>
            }
        </main>
    )
}

export default App
