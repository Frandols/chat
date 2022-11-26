import { createRoot } from 'react-dom/client'

import SocketContextProvider from './context/socket'

import { SiteLayout } from './layouts' 

import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <SocketContextProvider>
        <SiteLayout>
            <App/>
        </SiteLayout>
    </SocketContextProvider>
)
