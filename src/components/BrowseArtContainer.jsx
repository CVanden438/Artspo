import React from 'react'
import BrowseArtCard from './BrowseArtCard'
const BrowseArtContainer = ({ value, loading }) => {
  return (
    <div className='p-2 grid grid-cols-3 gap-1 w-5/6'>
      {value &&
        value.docs.map((doc) => {
          return <BrowseArtCard key={doc.id} data={doc.data()} id={doc.id} />
        })}
    </div>
  )
}

export default BrowseArtContainer
