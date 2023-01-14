import React from 'react'

const Comment = ({ data }) => {
  return (
    <div className='hover:bg-main-3/50 border-b border-black transition-all w-full h-20 overflow-y-auto pl-2 pr-2 bg-main-2/50'>
      <div className='flex justify-between'>
        <h1 className='font-bold'>{data.name}</h1>
        <p>{data.date.slice(0, 10)}</p>
      </div>
      <p className='break-words'>{data.text}</p>
    </div>
  )
}

export default Comment
