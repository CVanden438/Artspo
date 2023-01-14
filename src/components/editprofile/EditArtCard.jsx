import React, { useState } from 'react'
import { useArtContext } from '../../firebase/db'
import { Link } from 'react-router-dom'
import EditArtModal from './EditArtModal'
const EditArtCard = ({ data, id, removeFav }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { deleteArt } = useArtContext()
  return (
    <div className='hover:border flex flex-col p-2 bg-main-2 h-fit'>
      <Link to={`/art/${id}`}>
        <img src={data.image} alt='' />
      </Link>
      <h2 className='font-bold truncate'>{data.title}</h2>
      <p className='text-gray-400 truncate'>{data?.description.slice(0, 40)}</p>
      {removeFav && (
        <button
          onClick={() => removeFav(id)}
          className='bg-violet-600 rounded-lg w-1/2 m-auto'
        >
          Remove Favourite
        </button>
      )}
      {!removeFav && (
        <div className='flex justify-between'>
          <button
            onClick={() => {
              setIsModalOpen(true)
            }}
            className='bg-green-600 rounded-lg w-[50px]'
          >
            Edit
          </button>
          <button
            onClick={() => {
              deleteArt(data, id)
            }}
            className='bg-red-500 rounded-lg w-[60px]'
          >
            Delete
          </button>
        </div>
      )}
      {isModalOpen && (
        <EditArtModal setIsModalOpen={setIsModalOpen} data={data} id={id} />
      )}
    </div>
  )
}

export default EditArtCard
