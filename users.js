const users = []

const addUser = ({id, name, room}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase()

  const existingUsers = users.find((user) => user.name === name && user.room === room)

  if(existingUsers) {
    return {
      error: 'Username is taken'
    }
  }

  const user = { id, name, room }
  users.push(user)

  return { user }
}

const removeUser = () => {

}

const getUser = () => {

}

const getUsersInRoom = () => {

}