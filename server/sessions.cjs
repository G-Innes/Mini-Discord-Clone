/* eslint-disable no-undef */
module.exports = {
  initializeStore: () => {
    const sessionStorage = new Map()

    function getSessionById(sessionId) {
      return sessionStorage.get(sessionId)
    }

    function getSessionByUserId(userId) {
      for (const session of sessionStorage.values()) {
        if (session.userId === userId) {
          return session
        }
      }

      return null
    }

    function getAllSessions() {
      return Array.from(sessionStorage.values())
    }

    function getAllUsers() {
      return getAllSessions().map(session => {
        return {
          userId: session.userId,
          username: session.username,
          avatarUrl: session.avatarUrl,
          connected: session.connected,
        }
      })
    }

    function setSession(sessionId, session) {
      sessionStorage.set(sessionId, session)
    }

    function deleteSession(sessionId) {
      sessionStorage.delete(sessionId)
    }

    return {
      getSessionById,
      getSessionByUserId,
      getAllSessions,
      getAllUsers,
      setSession,
      deleteSession,
    }
  },
}

// Call the function to initialize the store
// Need to call get all sessions for userlist and get all users for userlist
// Call delete session when user leaves server for UserList to render only connected users
