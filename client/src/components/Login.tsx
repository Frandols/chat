import { 
    useRef,
    useEffect
} from 'react'

import { useSockets } from '../context/socket.context'

import './Login.css'

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
        <form
            className='login'
            onSubmit={handleSetUsername}>
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
            <input
                className='login-input'
                placeholder="Username..."
                ref={usernameRef}
            />
            <button
                className='login-button'
                type="submit">
                Join
            </button>
        </form>
    )
}

export default Login