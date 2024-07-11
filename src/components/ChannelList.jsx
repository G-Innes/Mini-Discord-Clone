import { useState, useEffect } from 'react'
import ConnectionControls from '@/components/ConnectionControls';
import '@/index.css'

export default function ChannelList({ channels, currentChannel, onChannelChange, isConnected, setIsConnected, setUser }) {
  const [open, setOpen] = useState(true)

  // Function to check and update the sidebar state based on window width
  const updateSidebarState = () => {
    if (window.innerWidth < 768) { // Collapse for screens smaller than 768px
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    updateSidebarState(); // Check initially
    window.addEventListener('resize', updateSidebarState); // Add resize listener

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', updateSidebarState);
  }, []);

  return (
    <div className={`${open ? 'w-72' : 'w-16'} duration-300 h-full flex flex-col bg-med-grey p-4 relative`}>
      <img
        src="../../assets/expand.svg"
        alt="control"
        className={`${!open && 'rotate-180'} absolute cursor-pointer rounded-full -right-3 top-16 w-7 border-2 border-white`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex flex-col flex-grow">
      <div className="flex gap-x-4 items-center mb-16">
        <img src="../../assets/discord.svg" alt="logo" className={`cursor-pointer duration-500 w-16 h-16`} />
        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}>Channels</h1>
      </div>
      <ul className={`list-none overflow-auto`}>
        {channels.map(channel => {
          const isActive = currentChannel && channel.name === currentChannel.name;
          const iconPath = `../../assets/letters/${channel.name.charAt(0).toLowerCase()}.svg`;
          return (
            <li
              key={channel.name}
              onClick={() => onChannelChange(channel)}
              className={`flex items-center p-2 cursor-pointer ${isActive ? 'text-purple font-bold' : 'text-gray-300'} hover:bg-gray-700 rounded-md  mb-5`}
              tabIndex={0}
            >

              <img src={iconPath} alt="icon" className={`cursor-pointer duration-500 w-10 h-10 mr-5`} />
              <span className={`${open ? 'block' : 'hidden'}`}>{channel.name}
              </span>
            </li>
          );
        })}
      </ul>
      </div>
      <div className={`${open ? 'opacity-100 max-h-screen visible' : 'opacity-0 max-h-0 invisible'} transition-opacity duration-300 ease-in-out overflow-hidden`}>
      <ConnectionControls isConnected={isConnected} setIsConnected={setIsConnected} setUser={setUser} />
      </div>

    </div>
  );
}
