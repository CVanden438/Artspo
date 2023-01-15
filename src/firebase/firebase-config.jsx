import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// const apiKey = import.meta.env.VITE_APIKEY
// const authDomain = import.meta.env.VITE_AUTHDOMAIN
// const projectId = import.meta.env.VITE_PROJECTID
// const storageBucket = import.meta.env.VITE_STORAGEBUCKET
// const messagingSenderId = import.meta.env.VITE_MESSAGINGSENDERID
// const appId = import.meta.env.VITE_APPID
// const key = import.meta.env.VITE_APIKEY
const firebaseConfig = {
  apiKey: 'AIzaSyBqIxFBycHMyyGxsCg2VMlTcsjhwesdG_c',

  authDomain: 'artspo-bfdef.firebaseapp.com',

  projectId: 'artspo-bfdef',

  storageBucket: 'artspo-bfdef.appspot.com',

  messagingSenderId: '264671738714',

  appId: '1:264671738714:web:854116e3e89d59ce275163',
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
export default app
