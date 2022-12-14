import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../firebase/auth'
import ArtModal from '../components/ArtModal'
import ProfileCard from '../components/ProfileCard'
import ProfileArt from '../components/ProfileArt'
import ProfileFavourites from '../components/ProfileFavourites'
import { useParams } from 'react-router-dom'
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDocs,
  collectionGroup,
  documentId,
} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import app from '../firebase/firebase.config'
const Profile = () => {
  const [isModalOpen, setisModalOpen] = useState(false)
  const params = useParams()
  const db = getFirestore(app)
  const [value, loading, error] = useCollection(
    query(collection(db, 'art'), where('uid', '==', params.user))
  )
  const [userValue, userValueLoading, userValueError] = useCollection(
    query(collection(db, 'users'), where('uid', '==', params.user))
  )
  const [userFavs] = useCollection(
    query(
      collection(db, 'art'),
      where('favourites', 'array-contains', params.user)
    )
  )
  // useCollection(query(collection(db,"art"),where()))
  // const favs = query(
  //   collectionGroup(db, 'favourites'),
  //   where('uid', '==', params.user)
  // )
  // const faaavs = getDocs(favs)
  // const [userFavs, l] = useCollection(favs)
  // if (l) {
  //   return <p>Loading.,</p>
  // }
  // console.log(userFavs)
  // console.log('favs', favs)
  // console.log(
  //   'test',
  //   query(collection(db, 'users'), where('uid', '==', params.user))
  // )
  // console.log('userValue', userValue)
  // console.log('userFavs', userFavs)
  return (
    <div className='p-5 grid grid-cols-6 gap-4 bg-green-100'>
      <div className='bg-red-200 flex flex-col items-center'>
        <ProfileCard user={userValue} />
        <button
          className='p-2 bg-green-800 w-20 text-white font-bold'
          onClick={() => setisModalOpen(true)}
        >
          Add Art
        </button>
      </div>
      <div className='bg-red-200 col-span-5'>
        <ProfileFavourites favourites={userFavs} />
      </div>
      <div className='col-span-6 bg-red-200'>
        <ProfileArt art={value} />
        {isModalOpen && <ArtModal setisModalOpen={setisModalOpen} />}
      </div>
    </div>
  )
}

export default Profile
