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
import app from '../firebase/firebase-config'
import { useCollection, useDocumentOnce } from 'react-firebase-hooks/firestore'
import AddComment from '../components/AddComment'
import Comment from '../components/Comment'
import { useArtContext } from '../firebase/db'
import { Link } from 'react-router-dom'
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
      <div className='flex flex-col items-center gap-4 p-2 w-full'>
        <div className=''>
          <p className='text-center font-bold text-2xl mb-1'>
            {snap?.data().title}
          </p>
          <img src={snap?.data().image} alt='' className='' />
        </div>
        <div className='w-1/3'>
          <div className='w-full gap-2 flex flex-col'>
            <div className='flex justify-between'>
              <Link to={`/profile/${snap?.data().uid}`}>
                <p className='font-bold'>{snap?.data().name}</p>
              </Link>
              <p className='text-main-6/90 p-1'>{snap?.data().category}</p>
            </div>
            <p className=''>{snap?.data().description}</p>
            <p>{snap?.data().date.slice(0, 10)}</p>
            <div className='flex justify-between gap-1'>
              <p className='border border-white/20 w-1/3 text-center'>
                Likes: {snap?.data().likeCount}
              </p>
              <p className='border border-white/20 w-1/3 text-center'>
                Favourites: {snap?.data().favourites?.length ?? '0'}
              </p>
              <p className='border border-white/20 w-1/3 text-center'>
                Comments: {value?.docs.length}
              </p>
            </div>
          </div>
          <div className='w-full pt-4'>
            <AddComment doc={params.art} />
            <div className='pt-2 overflow-y-auto overflow-x-hidden'>
              {value &&
                value.docs.map((c) => {
                  return <Comment key={c.id} data={c.data()} />
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtPage
