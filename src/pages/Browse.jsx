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

const Browse = () => {
  const db = getFirestore(app)
  const [value, loading] = useCollection(collection(db, 'art'))
  const { user } = useAuthContext()
  const { likeArt, favouriteArt, removeFav } = useArtContext()
  // async function likeArt(d) {
  //   const artRef = collection(doc(db, 'art', d.id), 'likes')
  //   const hasLiked = await getDoc(doc(artRef, user.uid))
  //   if (!hasLiked.exists()) {
  //     await updateDoc(doc(db, 'art', d.id), {
  //       likeCount: increment(1),
  //     })
  //     await setDoc(doc(artRef, user.uid), {})
  //   } else {
  //     await updateDoc(doc(db, 'art', d.id), {
  //       likeCount: increment(-1),
  //     })
  //     await deleteDoc(doc(artRef, user.uid))
  //   }
  // }

  return (
    <div className='p-4 grid grid-cols-3 gap-y-6 gap-x-5'>
      {loading && <p>Loading...</p>}
      {value &&
        value.docs.map((doc) => {
          return (
            <div key={doc.id} className='hover:bg-green-200 flex flex-col p-2'>
              <h2 className='font-bold'>{doc.data().title}</h2>
              <p className='text-gray-400'>{doc.data().description}</p>
              <p>Likes: {doc.data().likeCount}</p>
              <button onClick={() => likeArt(doc)}>Like</button>
              <button onClick={() => favouriteArt(doc)}>Favourite</button>
              <button onClick={() => removeFav(doc)}>Remove</button>
            </div>
          )
        })}
    </div>
  )
}

export default Browse
