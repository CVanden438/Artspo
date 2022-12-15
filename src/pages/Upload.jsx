import React, { useState } from 'react'
import { useArtContext } from '../firebase/db'
import { useAuthContext } from '../firebase/auth'

const initialState = {
  title: '',
  description: '',
}
const Upload = () => {
  const [input, setInput] = useState(initialState)
  const [file, setFile] = useState('')
  const { user } = useAuthContext()
  const { addArt } = useArtContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    addArt(input, file)
    setInput(initialState)
    setFile('')
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
        <input
          type='file'
          name='filename'
          //value={file}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type='submit'>Add Art</button>
      </form>
    </div>
  )
}

export default Upload
