import React, { useState } from 'react'
import EditArtCard from './EditArtCard'
import EditArtModal from './EditArtModal'
const EditProfileArt = ({ user, userArt }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 border border-black p-2'>
      {userArt &&
        userArt.docs.map((art) => {
          return <EditArtCard key={art.id} data={art.data()} id={art.id} />
        })}
    </div>
  )
}

export default EditProfileArt
