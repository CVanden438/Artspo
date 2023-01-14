import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../firebase/auth'
import ArtModal from '../components/ArtModal'
import ProfileCard from '../components/ProfileCard'
import ProfileArt from '../components/ProfileArt'
import ProfileFavourites from '../components/ProfileFavourites'
import { Navigate, useParams } from 'react-router-dom'
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
import { useArtContext } from '../firebase/db'
const Profile = () => {
  const [isModalOpen, setisModalOpen] = useState(false)
  const params = useParams()
  const { db } = useArtContext()
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
    <div className='p-5 grid grid-cols-6 gap-4'>
      <div className='bg-main-2 flex flex-col items-center justify-center'>
        <ProfileCard user={userValue} />
      </div>
      <div className='bg-main-2 col-span-5'>
        <p className='flex justify-center font-bold pt-1 pb-1 underline'>
          User's Favourites:
        </p>
        <ProfileFavourites favourites={userFavs} />
      </div>
      <div className='col-span-6 bg-main-2'>
        <p className='flex justify-center font-bold pt-1 pb-1 underline'>
          User's Creations:
        </p>
        <ProfileArt art={value} />
        {isModalOpen && <ArtModal setisModalOpen={setisModalOpen} />}
      </div>
    </div>
  )
}

export default Profile
