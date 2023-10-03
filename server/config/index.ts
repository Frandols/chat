export { default as EVENTS } from './events'

export default {
	corsOrigin: 'http://192.168.1.8:3000',
	port: Number(process.env.PORT) || 4000,
	host: process.env.HOST || 'localhost',
}
