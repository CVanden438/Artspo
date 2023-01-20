import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../firebase/auth'
import HeaderDropdown from './HeaderDropdown'
const Header = () => {
  const { signOut, user, signIn } = useAuthContext()
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className='bg-gradient-to-r from-indigo-900 via-[#090328] to-indigo-900 h-12 flex items-center justify-between pl-4 pr-4 font-bold'>
      <Link to='/'>Artspo</Link>
      <div className='flex gap-x-6'>
        <button
          className='block md:hidden'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Hamburger />
        </button>
        <Link to='/browse' className='hidden md:block'>
          Browse
        </Link>
        <div className=' gap-4 hidden md:flex'>
          {user && <Link to={`/profile/${user.uid}`}>Profile</Link>}
          {user && <Link to={'/upload'}>Upload</Link>}
          {user && <Link to={'/profile/edit'}>Edit Profile</Link>}
          <button
            onClick={user ? signOut : signIn}
            className='bg-indigo-600 pl-2 pr-2 text-white'
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
      {menuOpen && <HeaderDropdown setMenuOpen={setMenuOpen} />}
    </header>
  )
}

function Hamburger() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
      />
    </svg>
  )
}
export default Header
