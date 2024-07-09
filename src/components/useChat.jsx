import { useState, useEffect } from 'react'

export default function useChat({ username, socket }) {
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState({ welcome: [] })
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!socket.connected) {
      socket.auth = { username }
      socket.connect()
    }

    const handleConnect = () => {
      console.log('Connected to Websocket')
      socket.emit('channels:join', 'welcome') // Join welcome channel on connect
    }

    const handleChannels = channels => {
      setChannels(channels)
    }

    const handleMessage = (channel, message) => {
      setMessages(prevMessages => ({
        ...prevMessages,
        [channel]: [...(prevMessages[channel] || []), message],
      }))
    }

    const handleUsers = users => {
      setUsers(
        users.map(user => ({
          ...user,
          avatarUrl: `https://api.dicebear.com/9.x/lorelei/svg?seed=${user.username}`,
        })),
      )
    }
    const handleUsersUpdate = updatedUsers => {
      setUsers(
        updatedUsers.map(user => ({
          ...user,
          avatarUrl: `https://api.dicebear.com/9.x/lorelei/svg?seed=${user.username}`,
        })),
      )
    }

    const handleDisconnect = () => {
      console.log('Disconnected from Websocket')
    }

    socket.on('connect', handleConnect)
    socket.on('channels', handleChannels)
    socket.on('message:channel', handleMessage)
    socket.on('users', handleUsers)
    socket.on('users:update', handleUsersUpdate)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('channels', handleChannels)
      socket.off('message:channel', handleMessage)
      socket.off('users', handleUsers)
      socket.off('users:update', handleUsersUpdate)
      socket.off('disconnect', handleDisconnect)
      socket.disconnect()
    }
  }, [username, socket])

  return { channels, messages, users }
}
