import React from 'react'
import BrowseArtCard from './BrowseArtCard'
const BrowseArtContainer = ({ value, loading }) => {
  return (
    <div className='p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 w-5/6'>
      {value &&
        value.docs.map((doc) => {
          return <BrowseArtCard key={doc.id} data={doc.data()} id={doc.id} />
        })}
    </div>
  )
}

export default BrowseArtContainer
