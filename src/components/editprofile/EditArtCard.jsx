import React, { useState } from 'react'
import { useArtContext } from '../../firebase/db'
import { Link } from 'react-router-dom'
import EditArtModal from './EditArtModal'
const EditArtCard = ({ data, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { deleteArt, removeFav } = useArtContext()
  return (
    <div className='hover:bg-green-400 flex flex-col p-2 bg-green-300 h-fit'>
      <Link to={`/art/${id}`}>
        <img src={data.image} alt='' />
      </Link>
      <h2 className='font-bold'>{data.title}</h2>
      <p className='text-gray-400'>{data?.description.slice(0, 40)}</p>
      <button onClick={() => removeFav(id)}>Remove</button>
      <button
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        Edit
      </button>
      <button
        onClick={() => {
          deleteArt(data, id)
        }}
      >
        Delete
      </button>
      {isModalOpen && (
        <EditArtModal setIsModalOpen={setIsModalOpen} data={data} id={id} />
      )}
    </div>
  )
}

export default EditArtCard
