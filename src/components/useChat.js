import { useState, useEffect } from 'react'

export default function useChat(socket) {
  const [channels, setChannels] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    const handleChannels = channels => setChannels(channels)
    const handleUsers = users => setUsers(users)
    const handleUsersUpdate = updatedUsers => setUsers(updatedUsers)

    socket.on('channels', handleChannels)
    socket.on('users', handleUsers)
    socket.on('users:update', handleUsersUpdate)

    return () => {
      socket.off('channels', handleChannels)

      socket.off('users', handleUsers)
      socket.off('users:update', handleUsersUpdate)
    }
  }, [socket])

  return { channels, users }
}
