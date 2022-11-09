import Login from './components/Login'
import Chat from './components/Chat'

import { useSockets } from './context/socket.context'

import './App.css'

const App = () => {
    const { username } = useSockets()

    return (
        <main
            className="site-main">
            {
                username
                ? <Chat/>
                : <Login/>
            }
        </main>
    )
}

export default App
