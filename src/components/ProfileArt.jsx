import {
  getFirestore,
  collection,
  query,
  where,
  FieldValue,
} from 'firebase/firestore'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthContext } from '../firebase/auth'
import app from '../firebase/firebase.config'
import ArtCard from './ArtCard'

const ProfileArt = ({ art }) => {
  //   const [value, loading, error] = useCollection(
  //     query(collection(db, 'art'), where('uid', '==', user.uid))
  //   )
  return (
    <div className='grid grid-cols-5 gap-4'>
      {art?.docs.map((doc) => {
        return <ArtCard key={doc.id} data={doc.data()} />
      })}
    </div>
  )
}

export default ProfileArt