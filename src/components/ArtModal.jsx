import React, { useState } from 'react'
import { useAuthContext } from '../firebase/auth'
import app from '../firebase/firebase-config'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
} from 'firebase/firestore'
import { useArtContext } from '../firebase/db'

const initialState = {
  title: '',
  description: '',
}
const ArtModal = ({ setisModalOpen }) => {
  const [input, setInput] = useState(initialState)
  const { user } = useAuthContext()
  const { addArt } = useArtContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    addArt(input)
    setInput(initialState)
    setisModalOpen(false)
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

export default ArtModal
