import { Server } from 'socket.io'
import { createClient } from 'redis'
import { createAdapter } from '@socket.io/redis-adapter'
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)

const port = 3000
const io = new Server(server)

const pubClient = createClient({ socket: { host: 'redis', port: 6379 }})
const subClient = pubClient.duplicate()

async function main() {

    await Promise.all([pubClient.connect(), subClient.connect()])

    io.adapter(createAdapter(pubClient, subClient))

    io.on('connection', socket => {
        console.log(`connected ${socket.id}`)

        socket.join('test-room')

        socket.on('test', () => {
            console.log(`[TEST] -> ${port}`)
            // io.serverSideEmit('server')
            io.to('test-room').emit('server')
        })


    })




    io.on('server', () => {
        console.log(`[SERVER] -> AHOJ`)
    })

    app.use('/', express.static('public'))

    server.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main()
