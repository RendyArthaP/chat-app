import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'

let socket;

const Chat = () => {
  const location = useLocation()
  const ENDPOINT = 'localhost:5000'

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [listMessage, setListMessage] = useState([])
  
  useEffect(() => {
    const {name, room} = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, () => {

    })
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [ENDPOINT, location.search ])

  useEffect(() => {
    socket.on('message', (message) => {
      setListMessage([...listMessage, message])
    })
  }, [listMessage])

  const sendMessage = (e) => {
    e.preventDefault();
    
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }
  console.log(message, listMessage)
  return (
    <div>
      <div>
        <input 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
    </div>
  )
}

export default Chat
