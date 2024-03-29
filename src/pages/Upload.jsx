import React, { useState } from 'react'
import { useArtContext } from '../firebase/db'
import { useAuthContext } from '../firebase/auth'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import app from '../firebase/firebase-config'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import Alert from '../components/Alert'
const initialState = {
  title: '',
  description: '',
  category: 'category',
}
const Upload = () => {
  const [input, setInput] = useState(initialState)
  const [file, setFile] = useState('')
  const [url, setURL] = useState('')
  const [alert, setAlert] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const { addArt, fileExists, db } = useArtContext()
  const catRef = collection(db, 'categories')
  const [value, loading, error] = useCollectionOnce(catRef)
  const [disabled, setDisabled] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.category === 'category') {
      return
    }
    if (!input.title || !input.description || !file) {
      return
    }
    try {
      setDisabled(true)
      await addArt(input, file)
      setInput(initialState)
      setFile('')
      setURL('')
      setAlert(true)
      setAlertType('success')
      setTimeout(() => {
        setAlert(false)
        setDisabled(false)
      }, 3000)
    } catch (error) {
      console.log('error')
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 5000)
      setAlertType('error')
    }
  }
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
      setURL(URL.createObjectURL(e.target.files[0]))
    } else {
      setFile('')
      setURL('')
    }
  }
  return (
    <div className='flex justify-center align-middle pt-20'>
      <div className='grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 p-6 justify-center bg-main-3 w-4/5'>
        <form
          action='submit'
          onSubmit={handleSubmit}
          className='flex flex-col gap-y-4 w-full text-black'
        >
          <input
            type='text'
            placeholder='title'
            name='title'
            value={input.title}
            onChange={handleChange}
          />
          <textarea
            type='text'
            placeholder='description'
            name='description'
            value={input.description}
            onChange={handleChange}
            className=''
          />
          <select
            name='category'
            value={input.category}
            onChange={(e) => {
              handleChange(e)
            }}
          >
            <option>category</option>
            {value &&
              value.docs.map((cat) => {
                if (cat.id !== 'all') {
                  return <option key={cat.id}>{cat.id}</option>
                }
              })}
          </select>
          <input
            type='file'
            value={file?.filename}
            onChange={(e) => handleFileChange(e)}
            className='text-white'
          />
          <button
            type='submit'
            className='bg-main-5 hover:bg-main-4 text-white transition-all'
            disabled={disabled}
          >
            Add Art
          </button>
          {alert && (
            <p
              className={`${
                alertType === 'success' ? 'bg-green-500' : 'bg-red-400'
              }`}
            >
              {alertType === 'success'
                ? 'Art uploaded successfully!'
                : 'There was an error!'}
            </p>
          )}
          {fileExists && <p className='bg-red-400'>File already exists!</p>}
        </form>
        <div className='bg-main-1 w-full aspect-square'>
          Preview:
          {url && (
            <img
              src={url}
              alt='Image'
              className='aspect-square object-contain'
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Upload
