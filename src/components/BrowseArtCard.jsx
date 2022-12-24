import React from 'react'
import { Link } from 'react-router-dom'
import { useArtContext } from '../firebase/db'
import { getDoc, doc, collection, query, where } from 'firebase/firestore'
import { useAuthContext } from '../firebase/auth'
import { useState } from 'react'
import { useEffect } from 'react'
import { BiLike } from 'react-icons/Bi'
const BrowseArtCard = ({ data, id, del }) => {
  const [liked, setLiked] = useState(false)
  const [favourited, setFavourited] = useState(false)
  const { likeArt, favouriteArt, db } = useArtContext()
  const { user } = useAuthContext()
  const artRef = collection(doc(db, 'art', id), 'likes')
  async function handleLike(id, uid) {
    await likeArt(id, uid)
    const hasLiked = await getDoc(doc(artRef, user?.uid))
    setLiked(hasLiked.exists())
  }
  async function handleFavourite(id) {
    await favouriteArt(id)
    setFavourited(true)
  }
  useEffect(() => {
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
  }, [])
  return (
    <div className='hover:bg-green-400 flex flex-col p-2 gap-y-[2px] bg-green-300 h-fit'>
      <Link to={`/art/${id}`} className='relative'>
        <img
          src={data.image}
          alt=''
          className='w-full aspect-square object-cover'
        />
        <p className='absolute bg-green-200 right-[5px] bottom-[5px] pl-2 pr-2'>
          {data.category}
        </p>
        <div className='absolute bg-black w-full h-full top-0 opacity-0 hover:opacity-50 text-white flex items-center justify-center'>
          Open
        </div>
      </Link>
      <h2 className='font-bold'>{data.title}</h2>
      <p className='text-gray-600 truncate'>{data.description}</p>
      {/* <p>Likes: {data.likeCount}</p> */}
      <div className='flex justify-between'>
        <Link to={`/profile/${data.uid}`}>Profile</Link>
        <p>{data.date?.slice(0, 10)}</p>
      </div>
      <div className='flex justify-between gap-x-2'>
        <button
          onClick={() => handleLike(id, data.uid)}
          className={`w-[70px]  transition-all flex justify-between pl-2 pr-2 rounded-lg ${
            liked ? 'bg-blue-400' : 'bg-green-600'
          }`}
        >
          <BiLike className={`h-6 w-6`} />
          {data.likeCount}
        </button>
        <button
          onClick={() => handleFavourite(id)}
          className={`w-[150px] transition duration-500 rounded-lg ${
            favourited ? 'bg-orange-400' : 'bg-green-600'
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
