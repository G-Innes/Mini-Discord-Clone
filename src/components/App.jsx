import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'
import LoginForm from '@/components/User/LoginForm'

import Chat from '@/components/Chat'
import '@/index.css'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [user, setUser] = useState({ username: '', avatarUrl: '' })

  // Listening for Socket connection changes
  useEffect(() => {
    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)

    return () => {
      // Clean up
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])


  if (!user.username) {
    return <LoginForm setUser={setUser} />
  }

  return (
    <>
    <div>
        <Chat user={user} isConnected={isConnected} setIsConnected={setIsConnected} setUser={setUser}/>
      </div>
    </>
  )
}

export default App
