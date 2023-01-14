import app from './firebase-config'
import React, { useContext, useState } from 'react'
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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { useAuthContext } from './auth'

const ArtContext = React.createContext()

const ArtProvider = ({ children }) => {
  const db = getFirestore(app)
  const storage = getStorage()
  const { user } = useAuthContext()

  async function addArt(input, file) {
    const path = `images/${user.uid}/${file.name}`
    const fileExists = await checkFileExists(path)
    if (fileExists === true) {
      throw new Error('File already exists')
    }
    await uploadArt(file, path)
    await addCatCount(input.category)
    await addCatCount('all')
    //const artRef = String(ref(storage, path))
    const artURL = await getDownloadURL(ref(storage, path))
    const artURLString = String(artURL)
    await updateDoc(doc(db, 'users', user.uid), {
      totalArt: increment(1),
    })
    await addDoc(collection(db, 'art'), {
      title: input.title,
      description: input.description,
      uid: user.uid,
      name: user.displayName,
      likeCount: 0,
      image: artURLString,
      path: path,
      category: input.category,
      date: new Date().toISOString(),
      dateMS: new Date().getTime(),
    })
  }

  async function checkFileExists(path) {
    const pathRef = ref(storage, path)
    try {
      await getDownloadURL(pathRef)
      return true
    } catch (error) {
      return false
    }
  }

  async function deleteArt(data, id) {
    const artStorageRef = ref(storage, data.path)
    await deleteObject(artStorageRef)
    await removeCatCount(data.category)
    await removeCatCount('all')
    const artRef = doc(db, 'art', id)
    await deleteDoc(artRef)
    await updateDoc(doc(db, 'users', user.uid), {
      totalArt: increment(-1),
    })
  }

  async function editArt(data, id) {
    const artRef = doc(db, 'art', id)
    await updateDoc(artRef, {
      title: data.title,
      description: data.description,
    })
  }

  async function addCatCount(cat) {
    const catRef = doc(db, 'categories', cat)
    await updateDoc(catRef, {
      count: increment(1),
    })
  }

  async function removeCatCount(cat) {
    const catRef = doc(db, 'categories', cat)
    await updateDoc(catRef, {
      count: increment(-1),
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

  async function likeArt(id, uid) {
    const artRef = collection(doc(db, 'art', id), 'likes')
    const hasLiked = await getDoc(doc(artRef, user.uid))
    if (!hasLiked.exists()) {
      await updateDoc(doc(db, 'art', id), {
        likeCount: increment(1),
      })
      await updateDoc(doc(db, 'users', uid), {
        totalLikes: increment(1),
      })
      await setDoc(doc(artRef, user.uid), {})
    } else {
      await updateDoc(doc(db, 'art', id), {
        likeCount: increment(-1),
      })
      await updateDoc(doc(db, 'users', uid), {
        totalLikes: increment(-1),
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
        deleteArt,
        editArt,
        db,
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
