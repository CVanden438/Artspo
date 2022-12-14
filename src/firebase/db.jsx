import app from './firebase.config'
import React, { useContext } from 'react'
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { useAuthContext } from './auth'

const ArtContext = React.createContext()

const ArtProvider = ({ children }) => {
  const db = getFirestore(app)
  const { user } = useAuthContext()

  async function addArt(input) {
    await addDoc(collection(db, 'art'), {
      title: input.title,
      description: input.description,
      uid: user.uid,
      likeCount: 0,
    })
  }

  async function favouriteArt(d) {
    const favRef = doc(db, 'art', d.id)
    const q = await getDoc(favRef)
    await updateDoc(favRef, {
      favourites: arrayUnion(user.uid),
    })
  }
  async function removeFav(d) {
    const favRef = doc(db, 'art', d.id)
    await updateDoc(favRef, {
      favourites: arrayRemove(user.uid),
    })
  }
  async function likeArt(d) {
    const artRef = collection(doc(db, 'art', d.id), 'likes')
    const hasLiked = await getDoc(doc(artRef, user.uid))
    if (!hasLiked.exists()) {
      await updateDoc(doc(db, 'art', d.id), {
        likeCount: increment(1),
      })
      await setDoc(doc(artRef, user.uid), {})
    } else {
      await updateDoc(doc(db, 'art', d.id), {
        likeCount: increment(-1),
      })
      await deleteDoc(doc(artRef, user.uid))
    }
  }

  return (
    <ArtContext.Provider value={{ likeArt, addArt, favouriteArt, removeFav }}>
      {children}
    </ArtContext.Provider>
  )
}

const useArtContext = () => {
  return useContext(ArtContext)
}

export { useArtContext, ArtProvider }
