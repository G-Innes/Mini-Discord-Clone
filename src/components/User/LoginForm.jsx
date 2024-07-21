import { useState } from 'react'
import '@/index.css'

const avatars = [
  '/assets/avatars/cat.svg',
  '/assets/avatars/dog.svg',
  '/assets/avatars/dragon.svg',
  '/assets/avatars/elephant.svg',
  '/assets/avatars/panda.svg',
  '/assets/avatars/wolf.svg',
  '/assets/avatars/zebra.svg',
]

export default function LoginForm({ handleLogin }) {
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[3])

  function handleSubmit(event) {
    event.preventDefault()
    handleLogin({ username: name, avatarUrl: selectedAvatar })
  }

  return (
    <div className="min-h-screen bg-black flex pt-20 gap-20 items-center flex-col">
      <img src="../../assets/discord.svg" alt="logo" className="w-16 h-16" />
      <div className="w-full max-w-sm mx-auto flex justify-center items-center bg-purple rounded">
        <form
          onSubmit={handleSubmit}
          className="bg-light-grey shadow-md rounded px-8 pt-6 pb-8 m-4"
        >
          <div className="mb-4">
            <label
              className="block text-white text-center text-sm font-bold mb-2"
              htmlFor="username"
            >
              Enter a Username & pick an Avatar to start chatting:
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
          <div className="flex justify-center">
            {avatars.map(avatar => (
              <img
                key={avatar}
                src={avatar}
                alt="avatar"
                className={`cursor-pointer w-10 h-10 m-1 ${selectedAvatar === avatar ? 'border-2 rounded-full border-purple' : ''}`}
                onClick={() => setSelectedAvatar(avatar)}
              />
            ))}
          </div>

          <div className="flex items-center justify-center mt-8">
            <button
              className="bg-dark-grey hover:bg-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={name.length === 0}
            >
              Chat Now 💬
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
