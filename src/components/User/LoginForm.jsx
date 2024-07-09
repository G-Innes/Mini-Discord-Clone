import { useState } from 'react'
import buttonStyle from '@/components/CSS/ButtonStyle.module.css'
import InputStyle from '@/components/CSS/InputStyle.module.css'
import FormStyle from '@/components/CSS/LoginForm.module.css'

export default function LoginForm({ setUser }) {
  const [name, setName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const seed = `${name}-${Math.random().toString(36).substr(2, 9)}`
    const avatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}`
    setUser({ username: name, avatarUrl }) // attach avatarUrl to user
  }

  return (
    <form onSubmit={handleSubmit} className={FormStyle.container}>
      <label style={{ marginBottom: '64px' }}>
        Enter a Username to start chatting:
        <input
          className={InputStyle.input}
          style={{ marginTop: '8px' }}
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Enter your username"
        />
      </label>
      <button className={buttonStyle.button} type="submit">
        Chat Now 💬
      </button>
    </form>
  )
}
