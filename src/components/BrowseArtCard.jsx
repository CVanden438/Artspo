import React from 'react'
import { Link } from 'react-router-dom'
import { useArtContext } from '../firebase/db'
import { getDoc, doc, collection, query, where } from 'firebase/firestore'
import { useAuthContext } from '../firebase/auth'
import { useState } from 'react'
import { useEffect } from 'react'
const LikeIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
      />
    </svg>
  )
}

const BrowseArtCard = ({ data, id, del }) => {
  const [liked, setLiked] = useState(false)
  const [favourited, setFavourited] = useState(false)
  const { likeArt, favouriteArt, db } = useArtContext()
  const { user, signIn } = useAuthContext()
  const artRef = collection(doc(db, 'art', id), 'likes')
  async function handleLike(id, uid) {
    if (!user) {
      return signIn()
    }
    await likeArt(id, uid)
    const hasLiked = await getDoc(doc(artRef, user?.uid))
    setLiked(hasLiked.exists())
  }
  async function handleFavourite(id) {
    if (!user) {
      return signIn()
    }
    await favouriteArt(id)
    setFavourited(true)
  }
  useEffect(() => {
    if (user) {
      getDoc(doc(artRef, user?.uid)).then((result) => {
        setLiked(result.exists())
      })
      if (data.favourites) {
        for (let i of data.favourites) {
          if (i === user?.uid) {
            setFavourited(true)
          }
        }
      }
    }
  }, [])
  return (
    <div className=' flex flex-col hover:outline outline-1 p-1 gap-y-[2px]  h-fit'>
      <Link to={`/art/${id}`} className='relative'>
        <img
          src={data.image}
          alt=''
          className='w-full aspect-square object-cover'
        />
        <p className='absolute bg-indigo-800 right-[5px] bottom-[5px] pl-2 pr-2'>
          {data.category}
        </p>
        <div className='absolute bg-black w-full h-full top-0 opacity-0 hover:opacity-50 text-white flex items-center justify-center'>
          Open
        </div>
      </Link>
      <h2 className='font-bold'>{data.title}</h2>
      <p className='text-white/70 truncate'>{data.description}</p>
      {/* <p>Likes: {data.likeCount}</p> */}
      <div className='flex justify-between'>
        <Link to={`/profile/${data.uid}`}>{data.name}</Link>
        <p>{data.date?.slice(0, 10)}</p>
      </div>
      <div className='flex justify-between gap-x-2'>
        <button
          onClick={() => handleLike(id, data.uid)}
          className={`w-[60px] transition-all flex justify-between pl-2 pr-2 ${
            liked ? 'bg-main-4/50 outline outline-1' : 'bg-main-3/50'
          }`}
        >
          {/* <BiLike className={`h-6 w-6`} /> */}
          <LikeIcon />
          {data.likeCount}
        </button>
        <button
          onClick={() => handleFavourite(id)}
          className={`w-[150px] transition duration-500 ${
            favourited ? 'bg-indigo-400 outline outline-1' : 'bg-cyan-600'
          }`}
        >
          {favourited ? 'Favourited!' : 'Add To Favourites'}
        </button>
      </div>
      {del && (
        <button
          onClick={() => {
            del(data, id)
          }}
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default BrowseArtCard
