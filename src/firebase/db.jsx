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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useAuthContext } from './auth'

const ArtContext = React.createContext()

const ArtProvider = ({ children }) => {
  const db = getFirestore(app)
  const storage = getStorage()
  const { user } = useAuthContext()

  async function addArt(input, file) {
    await uploadArt(file)
    const artRef = String(ref(storage, 'images/' + file.name))
    const artURL = await getDownloadURL(ref(storage, 'images/' + file.name))
    const artURLString = String(artURL)
    await addDoc(collection(db, 'art'), {
      title: input.title,
      description: input.description,
      uid: user.uid,
      likeCount: 0,
      image: artURLString,
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

  async function uploadArt(file) {
    const artRef = ref(storage, 'images/' + file.name)
    await uploadBytes(artRef, file)
  }

  return (
    <ArtContext.Provider
      value={{ likeArt, addArt, favouriteArt, removeFav, uploadArt }}
    >
      {children}
    </ArtContext.Provider>
  )
}

const useArtContext = () => {
  return useContext(ArtContext)
}

export { useArtContext, ArtProvider }
