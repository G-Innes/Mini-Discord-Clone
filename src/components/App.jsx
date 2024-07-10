import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'
import LoginForm from '@/components/User/LoginForm'
import Chat from '@/components/Chat'
import buttonStyle from '@/components/CSS/ButtonStyle.module.css'
import '../index.css'
import styles from '@/components/CSS/Layout.module.css'

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

  const leaveServer = () => {
    socket.emit('leaveServer', { username: user.username });
    setUser({ username: '', avatarUrl: '' });
    setIsConnected(false);
  };

  if (!user.username) {
    return <LoginForm setUser={setUser} />
  }

  return (
    <>
      <div className={styles.mainView}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <button
            className={buttonStyle.button}
            style={{ borderRadius: 100, width: 20, height: 20, padding: 0 }}
            onClick={() => socket.connect()}
          >
            🟢
          </button>

          <button
            className={buttonStyle.button}
            style={{ borderRadius: 100, width: 20, height: 20, padding: 0 }}
            onClick={() => socket.disconnect()}
          >
            🔴
          </button>
          <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
          <button
            className={buttonStyle.button}
            onClick={leaveServer}
            style={{ marginLeft: '10px' }}
          >
            Leave Server
          </button>
        </div>

        <Chat user={user} />
      </div>
    </>
  )
}

export default App
