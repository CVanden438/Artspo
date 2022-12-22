import React from 'react'
import BrowseArtCard from './BrowseArtCard'
const BrowseArtContainer = ({ value, loading }) => {
  return (
    <div className='p-4 grid grid-cols-3 gap-4 w-5/6 border border-black'>
      {value &&
        value.docs.map((doc) => {
          return <BrowseArtCard key={doc.id} data={doc.data()} id={doc.id} />
        })}
    </div>
  )
}

export default BrowseArtContainer
