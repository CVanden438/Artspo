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
  const [url, setURL] = useState('')
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setURL(URL.createObjectURL(e.target.files[0]))
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
          onChange={(e) => handleFileChange(e)}
        />
        <button type='submit'>Add Art</button>
        <img src={url} alt='' />
      </form>
    </div>
  )
}

export default Upload
