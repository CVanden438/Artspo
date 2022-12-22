import React from 'react'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import app from '../firebase/firebase.config'
import { getFirestore, collection } from 'firebase/firestore'
import { useArtContext } from '../firebase/db'

const BrowseCategories = ({
  setCategory,
  category,
  updateFiltered,
  updateAll,
  categories,
  setPage,
}) => {
  const { db } = useArtContext()
  // const [categories] = useCollectionOnce(collection(db, 'categories'))
  const handleClick = (id) => {
    setCategory(id)
    updateFiltered(id)
    updateAll()
    setPage(1)
  }
  return (
    <div className='flex gap-x-4 mt-6'>
      {categories &&
        categories.docs.map((cat) => {
          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`${
                category === cat.id ? 'bg-green-600' : 'bg-green-300'
              } pl-4 pr-4 pt-2 pb-2 hover:bg-green-400 active:bg-green-600 transition-all hover:scale-125 ease-in-out duration-500`}
            >
              {cat.id}
              <span className='mr-2'></span>
              {cat.data().count}
            </button>
          )
        })}
    </div>
  )
}

export default BrowseCategories
