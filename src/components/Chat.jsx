import { useState } from 'react'
import { socket } from '@/libs/socket'
import Message from './Message'
import UserList from './User/UserList'
import MessageInput from './MessageInput'
import ChannelList from './ChannelList'
import useChat from './useChat'
import styles from '@/components/CSS/Layout.module.css'

export default function Chat({ user }) {
  const { channels, messages, users } = useChat({ username: user.username, socket })
  const [currentChannel, setCurrentChannel] = useState({ name: 'welcome' })
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if (message && currentChannel) {
      socket.emit('message:channel:send', currentChannel.name, message)
      setMessage('')
    }
  }
  const handleChannelChange = channel => {
    setCurrentChannel(channel)
  }

  const currentMessages = messages[currentChannel.name] || []

  return (
    <div className={styles.layout}>
      <h1 className={styles.header}>Welcome {user.username}</h1>
      <div className={styles.main}>
        <ChannelList
          className={styles.sidebar}
          channels={channels}
          currentChannel={currentChannel}
          onChannelChange={handleChannelChange}
        />
        <div className={styles.chatSection}>
          <div className={styles.messages}>
            {currentMessages.map(msg => (
              <Message key={msg.id} message={msg} avatarUrl={user.avatarUrl} />
            ))}
          </div>

          <MessageInput
            message={message}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
          />
        </div>
        <UserList users={users} avatarUrl={user.avatarUrl} />
      </div>
    </div>
  )
}
