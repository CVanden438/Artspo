import React from 'react'
import {
  useCollection,
  useCollectionOnce,
} from 'react-firebase-hooks/firestore'
import app from '../firebase/firebase.config'
import {
  getFirestore,
  collection,
  setDoc,
  updateDoc,
  query,
  where,
  doc,
  addDoc,
  getDoc,
  increment,
  deleteDoc,
  orderBy,
  startAfter,
  limit,
  getDocs,
  endBefore,
  limitToLast,
} from 'firebase/firestore'
import { useAuthContext } from '../firebase/auth'
import { useArtContext } from '../firebase/db'
import BrowseArtCard from '../components/BrowseArtCard'
import BrowseCategories from '../components/BrowseCategories'
import { useState } from 'react'
import BrowseArtContainer from '../components/BrowseArtContainer'

const LIMIT = 6
const Browse = () => {
  const { db } = useArtContext()
  const [category, setCategory] = useState('all')
  const [categories] = useCollectionOnce(collection(db, 'categories'))
  const [page, setPage] = useState(1)
  const allInitial = query(
    collection(db, 'art'),
    orderBy('dateMS'),
    limit(LIMIT)
  )
  const filteredInitial = query(
    collection(db, 'art'),
    where('category', '==', category),
    orderBy('dateMS'),
    limit(LIMIT)
  )
  const [all, setAll] = useState(allInitial)
  const [filtered, setFiltered] = useState(filteredInitial)
  function updateFiltered(cat) {
    setFiltered(
      query(
        collection(db, 'art'),
        where('category', '==', cat),
        orderBy('dateMS'),
        limit(LIMIT)
      )
    )
  }
  function updateAll() {
    setAll(allInitial)
  }
  const [value, loading] = useCollection(category === 'all' ? all : filtered)
  async function nextPage() {
    let check = false
    for (let i of categories.docs) {
      if (i.id == category) {
        if (page === Math.ceil(i.data().count / LIMIT)) {
          check = true
        }
      }
    }
    if (check === true) {
      return
    }
    setPage(page + 1)
    const lastVisible = value.docs[value.docs.length - 1]
    setAll(query(allInitial, startAfter(lastVisible)))
    setFiltered(query(filteredInitial, startAfter(lastVisible)))
    // setAll(query(collection(db, 'art'), orderBy('dateMS'), limit(2)))
  }
  async function prevPage() {
    if (page === 1) {
      return
    }
    setPage(page - 1)
    const firstVisible = value.docs[0]
    setAll(query(allInitial, endBefore(firstVisible), limitToLast(LIMIT)))
    setFiltered(
      query(filteredInitial, endBefore(firstVisible), limitToLast(LIMIT))
    )
  }
  return (
    <div className='flex flex-col items-center pb-4 gap-y-2'>
      <BrowseCategories
        setCategory={setCategory}
        category={category}
        updateFiltered={updateFiltered}
        updateAll={updateAll}
        categories={categories}
        setPage={setPage}
      />
      {/* {loading && <p>Loading...</p>} */}
      <div className='flex gap-x-4'>
        <button onClick={prevPage}>{'<'}</button>
        <p>{page}</p>
        <button onClick={nextPage}>{'>'}</button>
      </div>
      <BrowseArtContainer value={value} loading={loading} />
    </div>
  )
}
//p-4 grid grid-cols-3 gap-y-6 gap-x-5
export default Browse
