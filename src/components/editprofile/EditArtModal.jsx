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
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    editArt(input, id)
    setIsModalOpen(false)
  }
  return (
    <div className='flex top-20 md:left-0 w-screen h-screen absolute'>
      <form
        action='submit'
        onSubmit={handleSubmit}
        className='flex flex-col bg-main-3 h-[220px] w-4/5 md:w-1/5 md:mx-auto p-6'
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
        <div className='flex justify-between'>
          <button
            type='submit'
            className='bg-main-5 hover:bg-main-4 rounded-lg w-1/2 mt-4'
          >
            Submit
          </button>
          <button
            type='button'
            className='w-1/2 bg-red-400 p-2 rounded-lg mt-4'
            onClick={() => {
              setIsModalOpen(false)
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditArtModal
