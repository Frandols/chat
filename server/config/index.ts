export { default as EVENTS } from './events'

export default {
    corsOrigin: 'http://localhost:3000',
    port: Number(process.env.PORT) || 4000,
    host: process.env.HOST || 'localhost'
}