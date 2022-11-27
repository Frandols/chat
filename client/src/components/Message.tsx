import { motion } from 'framer-motion'

import './Message.css'

import { MessageComponentAnimations } from '../animations'

const Message = ({
    message,
    user,
    time,
    messageOut
}) => {
    return (
        <div
            className={`message-container ${messageOut === true ? 'message-out' : 'message-in'}`}>
            <motion.div
                className="message"
                variants={MessageComponentAnimations.message}
                initial={{
                    ...MessageComponentAnimations.message.hidden,
                    x: messageOut 
                        ? 50 
                        : -50
                }}
                animate='visible'>
                {
                    !messageOut
                    ? (
                        <header
                            className="message-header">
                            {user.name}
                        </header>
                    ) : null
                }
                <p
                    className="message-text">
                    {message}
                </p>
                <footer
                    className="message-footer">
                    {time}
                </footer>
            </motion.div>
        </div>
    )
}

export default Message