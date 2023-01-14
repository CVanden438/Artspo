import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../firebase/auth'
import { useArtContext } from '../firebase/db'

const AddComment = ({ doc }) => {
  const [input, setInput] = useState('')
  const { addComment } = useArtContext()
  const { user, signIn } = useAuthContext()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      return signIn()
    }
    if (!input || input.length === 0) {
      return
    }
    addComment(doc, user, input)
    setInput('')
  }
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className=''>
      <form type='submit' onSubmit={handleSubmit} className='flex gap-x-2 mb-2'>
        <input
          type='text'
          placeholder='add comment'
          value={input}
          onChange={(e) => handleChange(e)}
          className='w-full text-black'
        />
        <button type='submit' className='bg-main-4 hover:bg-main-3 pl-2 pr-2'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddComment
