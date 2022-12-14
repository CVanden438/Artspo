import React from 'react'
import ArtCard from './ArtCard'

const ProfileFavourites = ({ favourites }) => {
  return (
    <div className='grid grid-cols-3'>
      {favourites?.docs.map((doc) => {
        return <ArtCard key={doc.id} data={doc.data()} />
      })}
    </div>
  )
}

export default ProfileFavourites
