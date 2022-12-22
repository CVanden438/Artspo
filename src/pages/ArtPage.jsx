import {
  documentId,
  getFirestore,
  query,
  collection,
  where,
  doc,
  orderBy,
} from 'firebase/firestore'
import React from 'react'
import { useParams } from 'react-router-dom'
import app from '../firebase/firebase.config'
import { useCollection, useDocumentOnce } from 'react-firebase-hooks/firestore'
import AddComment from '../components/AddComment'
import Comment from '../components/Comment'
import { useArtContext } from '../firebase/db'

const ArtPage = () => {
  const params = useParams()
  const { db } = useArtContext()
  const [snap, artLoading, artError] = useDocumentOnce(
    doc(db, 'art', params.art)
  )
  const [value, loading, error] = useCollection(
    query(
      collection(doc(db, 'art', params.art), 'comments'),
      orderBy('date', 'desc')
    )
  )
  return (
    <div className='flex align-middle justify-center pt-16'>
      <div className='flex p-6 justify-center gap-4 bg-green-300'>
        <div className='h-[600px] w-[600px] flex items-center bg-green-400'>
          <img
            src={snap?.data().image}
            alt=''
            className='aspect-square object-contain'
          />
        </div>
        <div className='h-[600px]'>
          <AddComment doc={params.art} />
          <div className='overflow-y-auto overflow-x-hidden h-[560px]'>
            {value &&
              value.docs.map((c) => {
                return <Comment key={c.id} data={c.data()} />
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtPage
