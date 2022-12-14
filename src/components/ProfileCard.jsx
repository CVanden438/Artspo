import React from 'react'
import { useAuthContext } from '../firebase/auth'

const ProfileCard = ({ user }) => {
  //const { user } = useAuthContext()
  return (
    <div className='flex flex-col items-center'>
      <img
        src={`${user?.docs[0].data().photo}`}
        referrerPolicy='no-referrer'
        alt='Profile Image'
        className='rounded-full h-24'
      />
      <p className='font-bold'>{user?.docs[0].data().name}</p>
      {/* Total Likes? */}
    </div>
  )
}

export default ProfileCard
