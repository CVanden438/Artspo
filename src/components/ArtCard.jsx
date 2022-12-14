import React from 'react'

const ArtCard = ({ data }) => {
  //console.log(data)
  return <div className='h-40 bg-red-400 w-full'>{data.title}</div>
}

export default ArtCard
