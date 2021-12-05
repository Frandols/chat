export default {
    corsOrigin: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000',
    port: process.env.PORT || 4000
}