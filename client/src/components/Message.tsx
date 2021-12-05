import './Message.css'

const Message = ({
    message,
    username,
    time,
    messageOut
}) => {
    return (
        <div
            className={`message-container ${messageOut === true ? 'message-out' : 'message-in'}`}>
            <div
                className="message">
                {
                    !messageOut
                    ? (
                        <header
                            className="message-header">
                            {username}
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
            </div>
        </div>
    )
}

export default Message