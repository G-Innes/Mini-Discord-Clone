import { socket } from '@/libs/socket'
import '@/index.css'

export default function ConnectionControls({ isConnected, setIsConnected, setUser, avatarUrl, username }) {
  const leaveServer = () => {
    socket.emit('leaveServer', { username: '' })
    setUser({ username: '', avatarUrl: '' })
    setIsConnected(false)
  }

  const toggleConnection = () => {
    if (isConnected) {
      socket.disconnect()
      setIsConnected(false)
    } else {
      socket.connect()
      setIsConnected(true)
    }
  }

  return (
    <div className="flex flex-col items-start">
    <div className="flex flex-row items-center gap-6 mb-5 ml-3">
    <img src={avatarUrl} alt="logo" className="cursor-pointer duration-500 w-8 h-8" />
    <h4 className="text-purple origin-left font-medium text-2xl duration-300">{username}</h4>
    </div>
    <div className="flex flex-row items-center">
      <button
        className={`${isConnected ? 'bg-purple' : 'bg-purple'} rounded-full w-5 h-5 flex items-center justify-center p-0`}
        onClick={toggleConnection}
      >
        {isConnected ? '🟢' : '🔴'}
      </button>
      <p className="ml-2 text-white">{isConnected ? 'Online' : 'Offline'}</p>
      <button
        className="bg-light-grey hover:bg-purple text-white font-bold py-2 px-4 rounded ml-2"
        onClick={leaveServer}
      >
        Leave Server
      </button>
    </div>
    </div>
  )
}
