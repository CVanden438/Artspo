import React from 'react'
import ArtCard from './ArtCard'

const ProfileFavourites = ({ favourites }) => {
  return (
    <div className='grid grid-cols-3 gap-x-4'>
      {favourites?.docs.map((doc) => {
        return <ArtCard key={doc.id} data={doc.data()} id={doc.id} />
      })}
    </div>
  )
}

export default ProfileFavourites
