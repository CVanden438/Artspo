import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../firebase/auth'
const HeaderDropdown = ({ setMenuOpen }) => {
  const { user, signIn, signOut } = useAuthContext()
  const closeMenu = () => {
    setMenuOpen(false)
  }
  return (
    <nav className='absolute z-10 p-2 top-12 w-full bg-main-4 left-0 flex gap-2 flex-col'>
      <Link
        to='/browse'
        onClick={closeMenu}
        className='hover:bg-main-2 text-lg'
      >
        Browse
      </Link>
      {user && (
        <Link
          to={`/profile/${user.uid}`}
          onClick={closeMenu}
          className='hover:bg-main-2 text-lg'
        >
          Profile
        </Link>
      )}
      {user && (
        <Link
          to={'/upload'}
          onClick={closeMenu}
          className='hover:bg-main-2 text-lg'
        >
          Upload
        </Link>
      )}
      {user && (
        <Link
          to={'/profile/edit'}
          onClick={closeMenu}
          className='hover:bg-main-2 text-lg'
        >
          Edit Profile
        </Link>
      )}
      <button
        onClick={user ? signOut : signIn}
        className='bg-indigo-600 pl-2 pr-2 text-white'
      >
        {user ? 'Logout' : 'Login'}
      </button>
    </nav>
  )
}

export default HeaderDropdown
