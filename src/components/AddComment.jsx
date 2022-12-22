import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../firebase/auth'
import { useArtContext } from '../firebase/db'

const AddComment = ({ doc }) => {
  const [input, setInput] = useState('')
  const { addComment } = useArtContext()
  const { user } = useAuthContext()
  const handleSubmit = (e) => {
    e.preventDefault()
    addComment(doc, user, input)
    setInput('')
  }
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  return (
    <div>
      <form type='submit' onSubmit={handleSubmit} className='flex gap-x-2 mb-2'>
        <input
          type='text'
          placeholder='add comment'
          value={input}
          onChange={(e) => handleChange(e)}
          className='w-[300px]'
        />
        <button type='submit' className='bg-green-600 pl-2 pr-2'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddComment
