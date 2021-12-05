import { 
    useRef,
    useEffect
} from 'react'
import './LogInForm.css'

import { useSockets } from '../context/socket.context'

const LogInForm = () => {
    const usernameRef = useRef(null)

    const { setUsername } = useSockets()

    useEffect(
        () => {
            usernameRef.current.value = localStorage.getItem("username") || ""
        }, 
        []
    )

    const handleSetUsername = e => {
        e.preventDefault()

        const value = usernameRef.current.value

        if(value === "") return

        setUsername(value)

        localStorage.setItem("username", value)
    }
    
    return (
        <form
            className="log-in-form"
            onSubmit={handleSetUsername}>
            <div
                className="log-in-form-title">
                <img
                    className="log-in-form-title-img"
                    src="/assets/icon.png"
                    alt="logo"
                />
                <h2
                    className="log-in-form-title-text">
                    Chat App
                </h2>
            </div>
            <input
                className="log-in-form-input"
                placeholder="Username..."
                ref={usernameRef}
            />
            <button
                className="log-in-form-button"
                type="submit">
                Join
            </button>
        </form>
    )
}

export default LogInForm