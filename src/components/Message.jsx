export default function Message({ message, avatarUrl }) {
  // Ensure message.timestamp is a Date object
  const timestamp = new Date(message.timestamp)

  const formattedTime = timestamp.toLocaleString('en-US', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div style={{ display: 'flex', alignItems: 'start', marginBottom: '6px' }}>
      <img
        src={avatarUrl}
        alt="Avatar"
        style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1rem' }}>{message.username}</h3>
        <p style={{ fontSize: '1.2rem', marginTop: '2px' }}>{message.message}</p>
        <span style={{ fontSize: '0.7rem' }}>{formattedTime}</span>
      </div>
    </div>
  )
}
