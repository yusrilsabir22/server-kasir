require('dotenv').config() // utils environment module
const http = require('http')
const appExpress = require('./src')
const server = http.createServer(appExpress); // App express

server.listen(process.env.PORT || 3000, () => { // Setting port
    console.log(`server listening on port ${process.env.PORT || 3000}`)
})