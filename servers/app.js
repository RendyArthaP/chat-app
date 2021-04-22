const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const routes = require('./router')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

app.use(routes)
app.use(cors())

io.on('connection', (socket) => {
  console.log('Connected')

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room)

    // callback();
  })

  socket.on('disconnect', () => {
    console.log('User Left')
  })
})

server.listen(PORT, () => {
  console.log(`Server run at ${PORT}`)
})
