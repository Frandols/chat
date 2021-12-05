import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import SocketsProvider from './context/socket.context'

ReactDOM.render(
    <React.StrictMode>
        <SocketsProvider>
            <App/>
        </SocketsProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
