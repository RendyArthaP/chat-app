const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const routes = require('./router')
const cors = require('cors')

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require('./users')

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
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      room
    })

    if(error) return callback(error);

    socket.emit('message', {
      user: 'admin',
      text: `Hello ${user.name} welcome to the ${user.room} room`
    })
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined`
    })
    socket.join(user.room);

    callback();
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', {
      user: user.name,
      text: message
    })

    callback()
  });

  socket.on('disconnect', () => {
    console.log('User Left')
  })
})

server.listen(PORT, () => {
  console.log(`Server run at ${PORT}`)
})
