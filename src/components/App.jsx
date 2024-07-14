import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'
import LoginForm from '@/components/User/LoginForm'

import Chat from '@/components/Chat'
import '@/index.css'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [user, setUser] = useState({ username: '', avatarUrl: '' })

  const handleLogin = newUser => {
    setUser(prevUser => {
      // Only update if the new username or avatarUrl is different
      if (prevUser.username !== newUser.username || prevUser.avatarUrl !== newUser.avatarUrl) {
        return { ...prevUser, ...newUser }
      }
      return prevUser // No change if the user is the same
    })
  }

  useEffect(() => {
    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    return () => {
      // Clean up
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
    }
  }, [])

  if (!user.username) {
    return <LoginForm handleLogin={handleLogin} />
  }

  return (
    <>
      <div>
        <Chat
          user={user}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          setUser={setUser}
        />
      </div>
    </>
  )
}

export default App
