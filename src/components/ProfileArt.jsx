import {
  getFirestore,
  collection,
  query,
  where,
  FieldValue,
} from 'firebase/firestore'
import React from 'react'
import BrowseArtCard from './BrowseArtCard'
const ProfileArt = ({ art }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-1 pl-2 pr-2'>
      {art?.docs.map((doc) => {
        return <BrowseArtCard key={doc.id} data={doc.data()} id={doc.id} />
      })}
    </div>
  )
}

export default ProfileArt
