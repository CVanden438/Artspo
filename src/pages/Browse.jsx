import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import app from '../firebase/firebase.config'
import {
  getFirestore,
  collection,
  setDoc,
  updateDoc,
  doc,
  addDoc,
  getDoc,
  increment,
  deleteDoc,
} from 'firebase/firestore'
import { useAuthContext } from '../firebase/auth'
import { useArtContext } from '../firebase/db'
import BrowseArtCard from '../components/BrowseArtCard'

const Browse = () => {
  const db = getFirestore(app)
  const [value, loading] = useCollection(collection(db, 'art'))

  return (
    <div className='p-4 grid grid-cols-3 gap-y-6 gap-x-5'>
      {loading && <p>Loading...</p>}
      {value &&
        value.docs.map((doc) => {
          return <BrowseArtCard key={doc.id} data={doc.data()} id={doc.id} />
        })}
    </div>
  )
}

export default Browse
