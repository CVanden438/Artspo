import React, { useState } from 'react'
import {
  useCollection,
  useCollectionOnce,
} from 'react-firebase-hooks/firestore'
import { useAuthContext } from '../firebase/auth'
import app from '../firebase/firebase-config'
import { getFirestore, collection, where, query } from 'firebase/firestore'
import EditProfileArt from '../components/editprofile/EditProfileArt'
import EditProfileCard from '../components/editprofile/EditProfileCard'
import EditProfileFavourites from '../components/editprofile/EditProfileFavourites'
import Header from '../components/Header'
import EditArtModal from '../components/editprofile/EditArtModal'
import { useArtContext } from '../firebase/db'
const EditProfile = () => {
  const { db } = useArtContext()
  const { user, loading } = useAuthContext()
  const [value] = useCollection(
    query(collection(db, 'art'), where('uid', '==', user?.uid))
  )
  const [userData] = useCollection(
    query(collection(db, 'users'), where('uid', '==', user?.uid))
  )
  const [favourites] = useCollection(
    query(
      collection(db, 'art'),
      where('favourites', 'array-contains', user?.uid)
    )
  )
  return (
    <div>
      <Header />
      <div className='p-6 flex flex-col gap-y-6'>
        <p>Your Art:</p>
        <EditProfileArt user={user} userArt={value} />
        <p>Your Favourites:</p>
        <EditProfileFavourites userFavs={favourites} />
      </div>
    </div>
  )
}

export default EditProfile
