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
    const usernameRef = useRef(null)

    const { setUsername } = useSockets()

    useEffect(
        () => {
            usernameRef.current.value = localStorage.getItem('username') || ''
        }, 
        []
    )

    const handleSetUsername = e => {
        e.preventDefault()

        const username = usernameRef.current.value

        if(username === '') return

        setUsername(username)

        localStorage.setItem(
            'username', 
            username
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
                ref={usernameRef}
            />
            <Button
                type='submit'>
                Join
            </Button>
        </motion.form>
    )
}

export default Login