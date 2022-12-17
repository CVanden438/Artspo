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
      <form type='submit' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='add comment'
          value={input}
          onChange={(e) => handleChange(e)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddComment
