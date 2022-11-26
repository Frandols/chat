import config from '../config'

import { version } from '../package.json'

import express from 'express'
import path from 'path'

import { createServer } from 'http'
import { Server } from 'socket.io'

import socket from './socket'

import { logger } from './utils'

const {
    corsOrigin,
    port,
    host
} = config

const app = express()
const server = createServer(app)

const io = new Server(
    server, 
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

server.listen(
    port,
    () => {
        logger.info(`Server running version ${version}`)
        logger.info(`http://${host}:${port}`)

        socket({ io })
    }
)