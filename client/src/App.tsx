import { AnimatePresence } from 'framer-motion'

import { Login, Chat } from './components'

import { useSockets } from './context/socket'

import './App.css'

const App = () => {
  const { user } = useSockets()

  return (
    <AnimatePresence mode="wait">
      {user ? <Chat key="chat" /> : <Login key="login" />}
    </AnimatePresence>
  )
}

export default App
