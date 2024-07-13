import { useState, useEffect } from 'react';
import '@/index.css';

export default function UserList({ users }) {
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(true);
  console.log('users', users);

  // Function to check and update the sidebar state based on window width
  const updateSidebarState = () => {
    if (window.innerWidth < 768) {
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


  const sessionID = localStorage.getItem('sessionID');

  const filteredUsers = users
    .filter(user => {
      if (sessionID) {
        return user.sessionID === sessionID; // Filter users by session ID
      }
      if (filter === 'online') return user.connected;
      if (filter === 'offline') return !user.connected;
      return true;
    })
    .sort((a, b) => b.connected - a.connected);
    console.log('filteredUsers', filteredUsers);

  return (
    <div className={`sticky right-0 top-0 flex flex-col duration-300 h-screen p-5 pt-5 bg-med-grey transform ${open ? 'w-48==72' : 'w-16'}`}>
      <img
        src="../../assets/expand.svg"
        alt="control"
        className={`${!open && 'rotate-180'} absolute cursor-pointer rounded-full -left-3 z-10 top-16 w-7 border-2 border-white`}
        onClick={() => setOpen(!open)}
      />
      
      <div className="flex gap-x-4 items-center justify-end mb-10">
        <h1 className={`text-white origin-right font-medium text-xl duration-300 ${!open && 'scale-0'}`}>Users</h1>
        <img src="../../assets/discord.svg" alt="logo" className={`cursor-pointer duration-500 w-16 h-16`} />
      </div>

      <div className={`flex justify-center ${!open && 'hidden'}`}>
        <button className="flex items-center justify-end px-4 py-2 text-gray-100 hover:bg-gray-700" onClick={() => setFilter('all')}>
          All
        </button>
        <button className="flex items-center justify-end px-4 py-2 text-gray-100 hover:bg-gray-700" onClick={() => setFilter('online')}>
          Online
        </button>
        <button className="flex items-center justify-end px-4 py-2 text-gray-100 hover:bg-gray-700" onClick={() => setFilter('offline')}>
          Offline
        </button>
        </div>

        <div className={`list-none overflow-auto ${!open && 'hidden'}`}>
        {filteredUsers.map((user, index) => {
          const displayName = user.username || 'User';
          const avatar= user.avatarUrl;
          const status = user.connected ? '🟢' : '🔴';
          console.log('avatar', avatar);
          return (
            <li href="#" key={user.id || index} className="flex items-center justify-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
              <img
                src={avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full ml-2"
              />
              {`${displayName} ${status}`}
            </li>
          );
        })}
        </div>
        

    </div>
  );
}