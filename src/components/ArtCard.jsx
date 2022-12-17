import React from 'react'
import { Link } from 'react-router-dom'

const ArtCard = ({ data, id }) => {
  //console.log(data)
  return (
    <div className='h-60 bg-red-400 w-full'>
      <img src={`${data.image}`} alt='' className='w-2/4' />
      <p className='font-bold'>{data.title}</p>
      <p>{data.description}</p>
      <Link to={`/profile/${data.uid}`}>Profile</Link>
      <Link to={`/art/${id}`}>Page</Link>
    </div>
  )
}

export default ArtCard
