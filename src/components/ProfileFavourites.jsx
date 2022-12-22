import React from 'react'
import ArtCard from './ArtCard'
import BrowseArtCard from './BrowseArtCard'
const ProfileFavourites = ({ favourites }) => {
  return (
    <div className='grid grid-cols-5 gap-x-4'>
      {favourites?.docs.map((doc) => {
        return <BrowseArtCard key={doc.id} data={doc.data()} id={doc.id} />
      })}
    </div>
  )
}

export default ProfileFavourites
