import React from 'react'
import ArtCard from './ArtCard'
import BrowseArtCard from './BrowseArtCard'
const ProfileFavourites = ({ favourites }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-auto h-[370px] pl-2 pr-2 pt-1'>
      {favourites?.docs.map((doc) => {
        return <BrowseArtCard key={doc.id} data={doc.data()} id={doc.id} />
      })}
    </div>
  )
}

export default ProfileFavourites
