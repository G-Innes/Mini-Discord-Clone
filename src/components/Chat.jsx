import { useState } from 'react'
import { socket } from '@/libs/socket'
import Message from './Message'
import UserList from './User/UserList'
import MessageInput from './MessageInput'
import ChannelList from './ChannelList'
import useChat from './useChat'
import '@/index.css'


export default function Chat({ user, isConnected, setIsConnected, setUser}) {
  const { channels, messages, users } = useChat({ username: user.username, socket })
  const [currentChannel, setCurrentChannel] = useState({ name: 'welcome' })
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (message && currentChannel) {
      const messageObject = {
        id: Date.now(),
        user: { username: user.username },
        message: message,
        timestamp: Date.now(),
      };
      console.log('Sending message:', messageObject);
      socket.emit('message:channel:send', currentChannel.name, messageObject);
      setMessage('')
    }
  }
  const handleChannelChange = channel => {
    setCurrentChannel(channel)
  }

  const currentMessages = messages[currentChannel.name] || []

  return (

      <div className="flex h-screen">
      <ChannelList
        channels={channels}
        currentChannel={currentChannel}
        onChannelChange={handleChannelChange}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        setUser={setUser}
        className="w-1/5"
      />


      <div className="flex flex-col w-3/5 flex-grow">
        <div className="overflow-auto h-full bg-light-grey">
          {currentMessages.map(msg => (
            <div key={msg.id} className="p-4  text-white">
              <Message username={msg.username} message={msg.message} avatarUrl={user.avatarUrl} />
            </div>
          ))}
        </div>


        <MessageInput
          message={message}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}

        />
      </div>


      <UserList users={users} avatarUrl={user.avatarUrl} className="w-1/5" />
    </div>

  )
}
