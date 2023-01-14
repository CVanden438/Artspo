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
    <div className='flex justify-center w-full h-full absolute mx-auto mt-40'>
      <form
        action='submit'
        onSubmit={handleSubmit}
        className='flex flex-col bg-main-3 h-[220px] w-[300px] p-6'
      >
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          placeholder='title'
          name='title'
          onChange={handleChange}
          value={input.title}
          className='text-black'
        />
        <label htmlFor='description'>Description:</label>
        <textarea
          type='text'
          placeholder='description'
          name='description'
          onChange={handleChange}
          value={input.description}
          className='text-black'
        />
        <button
          type='submit'
          className='bg-main-5 hover:bg-main-4 rounded-lg w-1/2 mx-auto mt-4'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditArtModal
