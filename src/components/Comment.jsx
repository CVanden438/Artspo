import React from 'react'

const Comment = ({ data }) => {
  return (
    <div className='border border-black m-2'>
      <h1 className='font-bold'>{data.name}</h1>
      <p>{data.text}</p>
    </div>
  )
}

export default Comment
