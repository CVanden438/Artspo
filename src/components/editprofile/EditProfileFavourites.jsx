import React from 'react'
import EditArtCard from './EditArtCard'
const EditProfileFavourites = ({ userFavs }) => {
  return (
    <div className='grid grid-cols-5 gap-2 border border-black p-2'>
      {userFavs &&
        userFavs.docs.map((art) => {
          return <EditArtCard key={art.id} data={art.data()} id={art.id} />
        })}
    </div>
  )
}

export default EditProfileFavourites
