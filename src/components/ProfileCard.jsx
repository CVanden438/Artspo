import React from 'react'
import { useAuthContext } from '../firebase/auth'

const ProfileCard = ({ user }) => {
  //const { user } = useAuthContext()
  return (
    <div className='flex items-center justify-center flex-col gap-y-4'>
      <img
        src={`${user?.docs[0].data().photo}`}
        referrerPolicy='no-referrer'
        alt='Profile Image'
        className='rounded-full h-24'
      />
      <p className='font-bold'>{user?.docs[0].data().name}</p>
      <p>Total Likes: {user?.docs[0].data().totalLikes}</p>
      <p>Total Posts: {user?.docs[0].data().totalArt}</p>
      {/* Total Likes? */}
    </div>
  )
}

export default ProfileCard
