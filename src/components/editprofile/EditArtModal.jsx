import React, { useState } from 'react'
import { useArtContext } from '../../firebase/db'
import { getFirestore, collection } from 'firebase/firestore'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

const EditArtModal = ({ setIsModalOpen, data, id }) => {
  const initialState = {
    title: data.title,
    description: data.description,
  }
  const [input, setInput] = useState(initialState)
  const { editArt } = useArtContext()
  // const catRef = collection(db, 'categories')
  // const [categories, loading, error] = useCollectionOnce(catRef)
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    editArt(input, id)
    setIsModalOpen(false)
  }
  return (
    <div>
      <form action='submit' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='title'
          name='title'
          onChange={handleChange}
          value={input.title}
        />
        <textarea
          type='text'
          placeholder='description'
          name='description'
          onChange={handleChange}
          value={input.description}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default EditArtModal
