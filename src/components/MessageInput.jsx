import buttonStyle from '@/components/CSS/ButtonStyle.module.css'
import InputStyle from '@/components/CSS/InputStyle.module.css'

export default function MessageInput({ message, onMessageChange, onSendMessage }) {
  return (
    <div style={{ display: 'flex' }}>
      <input
        className={InputStyle.input}
        type="text"
        value={message}
        onChange={e => onMessageChange(e.target.value)}
        placeholder="Type a message"
        onKeyDown={e => e.key === 'Enter' && onSendMessage()}
      />
      <button className={buttonStyle.button} onClick={onSendMessage}>
        Send Message
      </button>
    </div>
  )
}
