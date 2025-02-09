/* eslint-disable no-undef */
const { generateRandomId } = require('./utils.cjs')

module.exports = {
  buildMessage: (session, message) => {
    return {
      id: generateRandomId(),
      userId: session.userId,
      username: session.username,
      avatarUrl: session.avatarUrl,
      message,
      timestamp: new Date(),
    }
  },
}
