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
    const path = `images/${user.uid}/${file.name}`
    await uploadArt(file, path)
    await addCatCount(input.category)
    await addCatCount('all')
    //const artRef = String(ref(storage, path))
    const artURL = await getDownloadURL(ref(storage, path))
    const artURLString = String(artURL)
    await addDoc(collection(db, 'art'), {
      title: input.title,
      description: input.description,
      uid: user.uid,
      likeCount: 0,
      image: artURLString,
      category: input.category,
      date: new Date().toISOString(),
      dateMS: new Date().getTime(),
    })
  }

  async function addCatCount(cat) {
    const catRef = doc(db, 'categories', cat)
    await updateDoc(catRef, {
      count: increment(1),
    })
  }

  async function favouriteArt(id) {
    const favRef = doc(db, 'art', id)
    const q = await getDoc(favRef)
    await updateDoc(favRef, {
      favourites: arrayUnion(user.uid),
    })
  }
  async function removeFav(id) {
    const favRef = doc(db, 'art', id)
    await updateDoc(favRef, {
      favourites: arrayRemove(user.uid),
    })
  }

  async function addComment(d, user, comment) {
    const commentRef = collection(doc(db, 'art', d), 'comments')
    await addDoc(commentRef, {
      text: comment,
      uid: user.uid,
      name: user.displayName,
      date: new Date().toISOString(),
    })
  }

  async function likeArt(id) {
    const artRef = collection(doc(db, 'art', id), 'likes')
    const hasLiked = await getDoc(doc(artRef, user.uid))
    if (!hasLiked.exists()) {
      await updateDoc(doc(db, 'art', id), {
        likeCount: increment(1),
      })
      await setDoc(doc(artRef, user.uid), {})
    } else {
      await updateDoc(doc(db, 'art', id), {
        likeCount: increment(-1),
      })
      await deleteDoc(doc(artRef, user.uid))
    }
  }

  async function uploadArt(file, path) {
    const artRef = ref(storage, path)
    await uploadBytes(artRef, file)
  }

  return (
    <ArtContext.Provider
      value={{
        likeArt,
        addArt,
        favouriteArt,
        removeFav,
        uploadArt,
        addComment,
      }}
    >
      {children}
    </ArtContext.Provider>
  )
}

const useArtContext = () => {
  return useContext(ArtContext)
}

export { useArtContext, ArtProvider }
