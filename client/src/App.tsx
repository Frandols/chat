import { AnimatePresence } from 'framer-motion'

import { 
    Login, 
    Chat 
} from './components'

import { useSockets } from './context/socket'

import './App.css'

const App = () => {
    const { username } = useSockets()

    return (
        <AnimatePresence
            mode='wait'>
            {
                username
                ? <Chat key='chat' />
                : <Login key='login' />
            }
        </AnimatePresence>
    )
}

export default App
