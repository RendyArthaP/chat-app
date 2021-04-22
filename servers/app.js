const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const routes = require('./router')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(routes)

io.on('connection', (socket) => {
  console.log('Connected')

  socket.on('disconnect', () => {
    console.log('User Left')
  })
})

server.listen(PORT, () => {
  console.log(`Server run at ${PORT}`)
})
