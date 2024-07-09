import { useState } from 'react'
import userButton from '@/components/CSS/UserStatusButton.module.css'
import styles from '@/components/CSS/Layout.module.css'

export default function UserList({ users, avatarUrl }) {
  const [filter, setFilter] = useState('')

  const filteredUsers = users
    .filter(user => {
      if (filter === 'online') return user.connected
      if (filter === 'offline') return !user.connected
      return true
    })
    .sort((a, b) => b.connected - a.connected)

  return (
    <div className={styles.sidebar}>
      <h2>Users</h2>
      <div>
        <button className={userButton.button} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={userButton.button} onClick={() => setFilter('online')}>
          Online
        </button>
        <button className={userButton.button} onClick={() => setFilter('offline')}>
          Offline
        </button>
        <ul className={styles.userListItems}>
          {filteredUsers.map((user, index) => {
            const displayName = user.username || 'User'
            const status = user.connected ? '🟢' : '🔴'
            return (
              <li key={user.id || index} style={{ margin: '10px' }}>
                <img
                  src={avatarUrl}
                  alt="avatar"
                  style={{ width: 30, height: 30, borderRadius: '50%', marginRight: '10px' }}
                />
                {`${displayName} ${status}`}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
