import '@/index.css'

export default function MessageInput({ message, onMessageChange, onSendMessage }) {
  const handleSubmit = e => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage()
    }
  }

  return (
    <form className="flex bg-med-grey text-white p-2" onSubmit={handleSubmit}>
      <input
        className="flex-1 p-2 m-3 text-white-800 bg-light-grey rounded shadow-inner focus:outline-none focus:shadow-outline w-3/4"
        type="text"
        value={message}
        onChange={e => onMessageChange(e.target.value)}
        placeholder="Type a message"
      />
      <button
        type="submit"
        className="p-3 bg-med-grey text-white rounded hover:bg-purple focus:outline-none w-1/4"
        disabled={!message.trim()}
      >
        Send Message
      </button>
    </form>
  )
}
