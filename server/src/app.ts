import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import logger from './utils/logger'
import { version } from '../package.json'
import config from '../config'
import path from 'path'

import socket from './socket'

const corsOrigin = <string>config.corsOrigin
const port = <number>config.port
const host = <string>config.host

const app = express()

const httpServer = createServer(app)

const io = new Server(
    httpServer, 
    {
        cors: {
            origin: corsOrigin,
            credentials: true
        }
    }
)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join('client/build')))

    app.get(
        '*',
        (
            _,
            res
        ) => {
            try {
                return res
                .status(200)
                .sendFile(
                    path.resolve(
                        'client',
                        'build',
                        'index.html'
                    ),
                    error => {
                        if(error) {
                            return res
                            .status(400)
                            .send(error)
                        }
                    }
                )
            } catch(error) {
                return res
                .status(400)
                .send(error)
            }
        }
    )
}

app.get(
    '/', 
    (_, res) => {
        try {
            return res
            .status(200)
            .send(`Server running ${version} version.`)
        } catch(error) {
            return res
            .status(400)
            .send(error)
        }
    }
)

httpServer.listen(
    port,
    host,
    () => {
        logger.info(`Server running version ${version}.`)
        logger.info(`http://${host}:${port}`)

        socket({ io })
    }
)