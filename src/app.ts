import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import config from 'config'
import logger from './utils/logger'
import { version } from '../package.json'
import path from 'path'

import socket from './socket'

const port = config.get<number>('port')
const host = config.get<string>('host')
const corsOrigin = config.get<string>('corsOrigin')

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
        logger.info(`Server version ${version} listening.`)
        logger.info(`http://${host}:${port}`)

        socket({ io })
    }
)