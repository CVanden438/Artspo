import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

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
