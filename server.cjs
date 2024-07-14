/* eslint-disable no-undef */
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const { generateRandomId } = require('./server/utils.cjs')
const { initializeStore } = require('./server/sessions.cjs')
const { initializeChannel } = require('./server/channels.cjs')
const { buildMessage } = require('./server/messages.cjs')

const app = express()

const server = http.createServer(app)
const port = process.env.PORT || 8181

const io = new socketIo.Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173', 'https://piehost.com'],
  },
})

const CHANNEL_NAMES = ['welcome', 'general', 'react', 'learners', 'casual']
const WELCOME_CHANNEL = 'welcome'

const sessions = initializeStore()
const channels = CHANNEL_NAMES.map(channel => initializeChannel(channel))

// Custom middleware to prepare the session.
io.use(async (socket, next) => {
  const sessionId = socket.handshake.auth.sessionId

  // Ability to restore session from the client, if session ID is known.
  if (sessionId) {
    const session = sessions.getSessionById(sessionId)

    if (session) {
      socket.sessionId = sessionId
      socket.userId = session.userId
      socket.username = session.username
      socket.avatarUrl = session.avatarUrl

      sessions.setSession(sessionId, { ...session, connected: true }) // Added to update session as connected
      next()
    }
  }

  const username = socket.handshake.auth.username || `anonymous_${generateRandomId(2)}`
  const avatarUrl = socket.handshake.auth.avatarUrl || 'default_avatar_url'

  socket.sessionId = generateRandomId()
  socket.userId = generateRandomId()
  socket.username = username
  socket.avatarUrl = avatarUrl

  next()
})

io.on('connection', socket => {
  const userSession = sessions.getSessionByUserId(socket.userId)

  const currentSession = {
    sessionId: socket.sessionId,
    userId: socket.userId,
    username: socket.username,
    avatarUrl: socket.avatarUrl,
    connected: true,
  }

  sessions.setSession(socket.sessionId, currentSession)
  socket.emit('session', currentSession)
  io.emit('users:update', sessions.getAllUsers()) // added to update sessions with newly connected user

  channels.forEach(channel => socket.join(channel.name))
  socket.join(currentSession.userId)

  if (!userSession) {
    // Announce when user joins the server for the first time
    socket.in(WELCOME_CHANNEL).emit('user:join', {
      userId: currentSession.userId,
      username: currentSession.username,
      avatarUrl: currentSession.avatarUrl,
      connected: true,
    })
  }

  socket.emit('channels', channels)
  socket.emit('users', sessions.getAllUsers())

  socket.on('user:leave', () => {
    socket.in(WELCOME_CHANNEL).emit('user:leave', {
      userId: currentSession.userId,
      username: currentSession.username,
      avatarUrl: currentSession.avatarUrl,
      connected: false,
    })

    sessions.deleteSession(socket.sessionId)
    io.emit('users:update', sessions.getAllUsers()) // Update all clients
    socket.disconnect()
  })

  socket.on('message:channel:send', (channel, message) => {
    const registeredChannel = channels.find(it => it.name === channel)

    if (!registeredChannel) return

    const avatarUrl = currentSession.avatarUrl
    const builtMessage = buildMessage(currentSession, message, avatarUrl)

    registeredChannel.messages.push(builtMessage)

    socket.to(channel).emit('message:channel', channel, builtMessage)
    socket.emit('message:channel', channel, builtMessage) // Send to the sender as well
  })

  socket.on('message:channel:history', (channel, callback) => {
    const registeredChannel = channels.find(it => it.name === channel)

    if (!registeredChannel) return callback([])

    callback(registeredChannel.messages)
  })

  socket.on('disconnect', () => {
    const session = sessions.getSessionById(socket.sessionId)

    if (!session) return

    sessions.setSession(socket.sessionId, {
      ...session,
      connected: false,
    })

    io.emit('users:update', sessions.getAllUsers())

    socket.broadcast.emit('user:disconnect', {
      userId: session.userId,
      username: session.username,
      avatarUrl: session.avatarUrl,
      connected: false,
    })
  })
})

server.listen(port, () => {
  console.log('Server listening at port %d', port)
})
