import { useEffect, useState } from 'react'
import { socket } from '@/libs/socket'
import Message from './Message'
import UserList from './User/UserList'
import MessageInput from './MessageInput'
import ChannelList from './ChannelList'
import useChat from './useChat'
import useMessage from './useMessage'
import '@/index.css'

export default function Chat({ user, isConnected, setIsConnected, setUser }) {
  const [currentChannel, setCurrentChannel] = useState({ name: 'welcome' })
  const [message, setMessage] = useState('')
  const { messages, fetchChannelHistory } = useMessage(
    socket,
    user.username,
    user.avatarUrl,
    currentChannel,
  )
  const { channels, users } = useChat(socket)

  useEffect(() => {
    if (currentChannel.name !== 'welcome') {
      fetchChannelHistory(currentChannel.name)
    }
  }, [currentChannel.name, fetchChannelHistory])

  const handleSendMessage = () => {
    if (message && currentChannel) {
      const messageObject = {
        id: Date.now(),
        user: { username: user.username, avatarUrl: user.avatarUrl },
        message: message,
        timestamp: Date.now(),
      }
      socket.emit('message:channel:send', currentChannel.name, messageObject)
      setMessage('')
    }
  }
  const handleChannelChange = channel => {
    setCurrentChannel(channel)
  }

  const currentMessages = messages[currentChannel.name] || []
  const avatarUrl = user.avatarUrl

  return (
    <div className="flex h-screen">
      <ChannelList
        channels={channels}
        currentChannel={currentChannel}
        onChannelChange={handleChannelChange}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        setUser={setUser}
        username={user.username}
        avatarUrl={avatarUrl}
        className="w-1/5"
      />

      <div className="flex flex-col w-3/5 flex-grow">
        <div className="overflow-auto h-full bg-light-grey">
          {currentMessages.map(msg => (
            <div key={msg.id} className="p-4  text-white">
              <Message username={msg.username} message={msg.message} avatarUrl={msg.avatarUrl} />
            </div>
          ))}
        </div>

        <MessageInput
          message={message}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
        />
      </div>

      <UserList users={users} className="w-1/5" />
    </div>
  )
}
