import React from 'react'
import { Link } from 'react-router-dom'

const ArtCard = ({ data, id }) => {
  //console.log(data)
  return (
    <div className='bg-green-400'>
      <img src={`${data.image}`} alt='' className='w-full' />
      <p className='font-bold'>{data.title}</p>
      <p>{data.description}</p>
      <Link to={`/profile/${data.uid}`} className='mr-3'>
        Profile
      </Link>
      <Link to={`/art/${id}`}>Page</Link>
    </div>
  )
}

export default ArtCard
