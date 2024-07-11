import { useState } from 'react'
import '@/index.css'

export default function LoginForm({ setUser }) {
  const [name, setName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const seed = `${name}-${Math.random().toString(36).substr(2, 9)}`
    const avatarUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}`
    setUser({ username: name, avatarUrl }) // attach avatarUrl to user object
  }

  return (
    <div className='min-h-screen bg-black flex justify-center items-center'>
    
    <div className="w-full max-w-sm mx-auto flex justify-center items-center bg-purple rounded">
    <img src="../../assets/discord.svg" className='h-20 w-20'/>
      <form onSubmit={handleSubmit} className="bg-light-grey shadow-md rounded px-8 pt-6 pb-8 m-4">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
            Enter a Username to start chatting:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-light-grey leading-tight focus:outline-none focus:shadow-outline border-purple"
            id="username"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-dark-grey hover:bg-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Chat Now 💬
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}
