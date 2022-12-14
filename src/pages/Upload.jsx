import React, { useState } from 'react'
import { useArtContext } from '../firebase/db'
import { useAuthContext } from '../firebase/auth'

const initialState = {
  title: '',
  description: '',
}
const Upload = () => {
  const [input, setInput] = useState(initialState)
  const { user } = useAuthContext()
  const { addArt } = useArtContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    addArt(input)
    setInput(initialState)
  }
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <form action='submit' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='title'
          name='title'
          value={input.title}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='description'
          name='description'
          value={input.description}
          onChange={handleChange}
        />
        <button type='submit'>Add Art</button>
      </form>
    </div>
  )
}

export default Upload
