import {
  documentId,
  getFirestore,
  query,
  collection,
  where,
  doc,
} from 'firebase/firestore'
import React from 'react'
import { useParams } from 'react-router-dom'
import app from '../firebase/firebase.config'
import { useCollection, useDocumentOnce } from 'react-firebase-hooks/firestore'
import AddComment from '../components/AddComment'
import Comment from '../components/Comment'

const ArtPage = () => {
  const params = useParams()
  const db = getFirestore(app)
  const [snap, artLoading, artError] = useDocumentOnce(
    doc(db, 'art', params.art)
  )
  const [value, loading, error] = useCollection(
    collection(doc(db, 'art', params.art), 'comments')
  )
  return (
    <div className='flex p-6 pt-16 justify-center gap-4 bg-green-200'>
      <img src={snap?.data().image} alt='' />
      <div className=''>
        <AddComment doc={params.art} />
        {value &&
          value.docs.map((c) => {
            return <Comment key={c.id} data={c.data()} />
          })}
      </div>
    </div>
  )
}

export default ArtPage
