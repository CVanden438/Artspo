import React from 'react'
import { useArtContext } from '../../firebase/db'
import EditArtCard from './EditArtCard'
const EditProfileFavourites = ({ userFavs }) => {
  const { removeFav } = useArtContext()
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 border border-black p-2'>
      {userFavs &&
        userFavs.docs.map((art) => {
          return (
            <EditArtCard
              key={art.id}
              data={art.data()}
              id={art.id}
              removeFav={removeFav}
            />
          )
        })}
    </div>
  )
}

export default EditProfileFavourites
