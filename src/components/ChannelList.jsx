import styles from '@/components/CSS/Layout.module.css'

export default function ChannelList({ channels, currentChannel, onChannelChange }) {
  return (
    <div className={styles.sidebar}>
      <h2>Channels</h2>
      <ul className={styles.channels}>
        {channels.map(channel => {
          const isActive = currentChannel && channel.name === currentChannel.name
          return (
            <li
              key={channel.name}
              onClick={() => onChannelChange(channel)}
              style={{
                fontWeight: isActive ? 'bold' : 'normal',
                cursor: 'pointer',
                color: isActive ? 'green' : 'white',
              }}
              tabIndex={0}
              onKeyPress={e => e.key === 'Enter' && onChannelChange(channel)}
            >
              {channel.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
