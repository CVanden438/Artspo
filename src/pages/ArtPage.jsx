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
    <div className='flex align-middle justify-center pb-10'>
      <div className='flex flex-col items-center gap-4 p-2 w-3/4'>
        <p className='font-bold text-2xl'>{snap?.data().title}</p>
        <img src={snap?.data().image} alt='' className='' />
        <div className='w-full gap-1 flex flex-col'>
          <p className='text-white/70'>{snap?.data().category}</p>
          <p>{snap?.data().description}</p>
          <p>{snap?.data().date.slice(0, 10)}</p>
          <div className='flex justify-between'>
            <p>Likes: {snap?.data().likeCount}</p>
            <p>Favourites: {snap?.data().favourites?.length ?? '0'}</p>
            <p>Comments: {value?.docs.length}</p>
          </div>
        </div>
        <div className='w-full'>
          <AddComment doc={params.art} />
          <div className='overflow-y-auto overflow-x-hidden'>
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
