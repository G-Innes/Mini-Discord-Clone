import { useCallback, useEffect, useState } from 'react'

export default function useSocket(socket, username, avatarUrl) {
  const [messages, setMessages] = useState({ welcome: [] })

  const fetchChannelHistory = useCallback((channel) => {
    socket.emit('message:channel:history', channel, (history) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [channel]: history,
      }));
    });
  }, [socket]);

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId')
    socket.auth = { sessionId: storedSessionId || undefined, username, avatarUrl }

    if (!socket.connected) {
      socket.connect()
    }

    const handleConnect = () => {
      socket.emit('channels:join', 'welcome')
      fetchChannelHistory('welcome');

      // socket.emit('message:channel:history', 'welcome', history => {
      //   setMessages(prevMessages => ({
      //     ...prevMessages,
      //     welcome: history,
      //   }))
      // })
      // socket.emit('message:channel:history', currentChannel.name, history => {
      //   setMessages(prevMessages => ({
      //     ...prevMessages,
      //     currentChannel: history,
      //   }))
      // })

      socket.emit('message:channel:send', 'welcome', {
        message: `${username} has joined the chat!`,
        user: { username, avatarUrl },
        timestamp: Date.now(),
      })
    }

    const handleMessage = (channel, message) => {
      setMessages(prevMessages => ({
        ...prevMessages,
        [channel]: [...(prevMessages[channel] || []), message],
      }))
    }

    socket.on('connect', handleConnect)
    socket.on('message:channel', handleMessage)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('message:channel', handleMessage)
      socket.disconnect()
    }
  }, [socket, username, avatarUrl])

  return { messages, fetchChannelHistory }
}
