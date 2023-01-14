import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../firebase/auth'
const Header = () => {
  const { signOut, user, signIn } = useAuthContext()

  return (
    <header className='bg-gradient-to-r from-indigo-900 via-[#090328] to-indigo-900 h-12 flex items-center justify-between pl-4 pr-4 font-bold'>
      <Link to='/'>Artspo</Link>
      <div className='flex gap-x-6'>
        <Link to='/browse'>Browse</Link>
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
    </header>
  )
}

export default Header
