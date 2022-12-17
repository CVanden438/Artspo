import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../firebase/auth'
const Header = () => {
  const { signOut, user, signIn } = useAuthContext()

  return (
    <header className='bg-green-600 h-12 flex items-center justify-between pl-4 pr-4 font-bold'>
      <Link to='/'>Artspo</Link>
      <div className='flex gap-x-6'>
        <Link to='/browse'>Browse</Link>
        {user && <Link to={`/profile/${user.uid}`}>Profile</Link>}
        {user && <Link to={'/upload'}>Upload</Link>}
        <button
          onClick={user ? signOut : signIn}
          className='bg-green-800 pl-2 pr-2 text-white'
        >
          {user ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  )
}

export default Header
