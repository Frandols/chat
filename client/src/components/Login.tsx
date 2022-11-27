import { 
    useRef,
    useEffect
} from 'react'
import { motion } from 'framer-motion'

import {
    Input,
    Button
} from '../components'

import { useSockets } from '../context/socket'

import './Login.css'

import { LoginComponentAnimations } from '../animations'

const Login = () => {
    const nameRef = useRef(null)

    const { socket } = useSockets()

    useEffect(
        () => {
            nameRef.current.value = localStorage.getItem('user') || ''
        }, 
        []
    )

    const handleSetUsername = event => {
        event.preventDefault()

        const name = nameRef.current.value

        socket.emit(
            'SET_NAME',
            name
        )
    }
    
    return (
        <motion.form
            className='login'
            onSubmit={handleSetUsername}
            variants={LoginComponentAnimations.login}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <img
                className='logo'
                src='/assets/icon.svg'
                alt='logo'
                width={75}
                height={75}
            />
            <h1
                className='login-title'>
                Welcome, choose your <b>username</b>
            </h1>
            <Input
                placeholder='Username...'
                ref={nameRef}
            />
            <Button
                type='submit'>
                Join
            </Button>
        </motion.form>
    )
}

export default Login