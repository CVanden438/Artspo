import React from 'react'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import app from '../firebase/firebase-config'
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
    <div className='grid  grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 mt-6 mb-2'>
      {categories &&
        categories.docs.map((cat) => {
          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`${
                category === cat.id ? 'bg-main-6' : 'bg-main-4 hover:bg-main-6'
              } pl-4 pr-4 text-white pt-2 pb-2 transition-all hover:scale-125 ease-in-out duration-500`}
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
