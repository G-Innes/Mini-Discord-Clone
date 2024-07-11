export default function Message({ message, avatarUrl }) {

  const timestamp = new Date(message.timestamp)

  const formattedTime = timestamp.toLocaleString('en-US', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="flex items-start mb-1.5">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-12 h-12 rounded-full mr-2.5"
      />
      <div className="flex flex-col">
        <h3 className="text-base font-extrabold">{message.user.username}</h3>
        <p className="text-lg mt-0.5">{message.message}</p>
        <span className="text-xs font-thin">{formattedTime}</span>
      </div>
    </div>
  )
}
