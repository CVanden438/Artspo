import React from 'react'

const Comment = ({ data }) => {
  return (
    <div className='hover:bg-green-600 border-b border-black transition-all w-[375px] h-20 overflow-y-auto pl-2 pr-2 bg-green-400'>
      <div className='flex justify-between'>
        <h1 className='font-bold'>{data.name}</h1>
        <p>{data.date.slice(0, 10)}</p>
      </div>
      <p className='break-words'>{data.text}</p>
    </div>
  )
}

export default Comment
