import '@/index.css'
import { useState } from 'react'

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex">
      <div
        className={`${open ? 'w-72' : 'w-20'}  duration-300 h-screen p-5 pt-5 bg-dark-grey relative`}
      >
        <img
          src="../../assets/expand.svg"
          alt="control"
          className={`${!open && 'rotate-180'} absolute cursor-pointer rounded-full -right-3 top-16 w-7 border-2 border-white`}
          onClick={() => setOpen(!open)}
        />
        <div className={'flex gap-x-4 items-center'}>
          <img
            src="../../assets/discord.svg"
            alt="logo"
            className={`cursor-pointer duration-500 w-16 h-16`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}
          >
            Discord(clone)
          </h1>
        </div>
        {children}
      </div>
    </div>
  )
}
