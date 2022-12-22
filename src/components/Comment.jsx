import React from 'react'

const Comment = ({ data }) => {
  return (
    <div className='hover:bg-green-600 transition-all w-[375px] h-20 overflow-y-auto pl-2 pr-2 bg-green-400'>
      <h1 className='font-bold'>{data.name}</h1>
      <p className='break-words'>{data.text}</p>
    </div>
  )
}

export default Comment
