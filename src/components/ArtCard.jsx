import React from 'react'

const ArtCard = ({ data }) => {
  //console.log(data)
  return (
    <div className='h-40 bg-red-400 w-full'>
      {data.title}
      <img src={`${data.image}`} alt='' className='w-1/2' />
    </div>
  )
}

export default ArtCard
