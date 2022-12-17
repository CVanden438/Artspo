import React from 'react'
import { Link } from 'react-router-dom'
import { useArtContext } from '../firebase/db'

const BrowseArtCard = ({ data, id }) => {
  const { likeArt, favouriteArt, removeFav } = useArtContext()
  return (
    <div className='hover:bg-green-200 flex flex-col p-2'>
      <Link to={`/art/${id}`}>
        <img src={data.image} alt='' />
      </Link>
      <h2 className='font-bold'>{data.title}</h2>
      <p className='text-gray-400'>{data.description}</p>
      <p>Likes: {data.likeCount}</p>
      <button onClick={() => likeArt(id)}>Like</button>
      <button onClick={() => favouriteArt(id)}>Favourite</button>
      <button onClick={() => removeFav(id)}>Remove</button>
      <Link to={`/profile/${data.uid}`}>Profile</Link>
    </div>
  )
}

export default BrowseArtCard
