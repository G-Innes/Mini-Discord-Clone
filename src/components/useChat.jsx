import { useState, useEffect } from 'react'

export default function useChat({ username, socket }) {
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState({ welcome: [] })
  const [users, setUsers] = useState([])

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId')
    if (storedSessionId) {
      socket.auth = { sessionId: storedSessionId, username }
    } else {
      socket.auth = { username }
    }

    if (!socket.connected) {
      socket.connect()
    }

    const handleConnect = () => {
      console.log('Connected to Websocket')
      socket.emit('channels:join', 'welcome')

      socket.emit('message:channel:send', 'welcome', {
        message: `${username} has joined the chat!`,
        user: { username },
        timestamp: Date.now(),
      })
    }

    const handleSession = session => {
      localStorage.setItem('sessionId', session.sessionId)
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
      const updatedUsers = users.map(user => ({
        ...user,
        avatarUrl: `https://api.dicebear.com/9.x/lorelei/svg?seed=${user.username}`,
      }))
      setUsers(updatedUsers)
    }

    const handleUsersUpdate = updatedUsers => {
      const updatedUsersWithAvatar = updatedUsers.map(user => ({
        ...user,
        avatarUrl: `https://api.dicebear.com/9.x/lorelei/svg?seed=${user.username}`,
      }))
      setUsers(updatedUsersWithAvatar)
    }

    const handleDisconnect = () => {
      console.log('Disconnected from Websocket')
    }

    socket.on('connect', handleConnect)
    socket.on('session', handleSession)
    socket.on('channels', handleChannels)
    socket.on('message:channel', handleMessage)
    socket.on('users', handleUsers)
    socket.on('users:update', handleUsersUpdate)
    socket.on('disconnect', handleDisconnect)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('session', handleSession)
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
