import React, { useContext } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore'
import app from './firebase-config'
const provider = new GoogleAuthProvider()
const auth = getAuth()
const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth)
  const db = getFirestore(app)

  async function createUser(user) {
    const userExists = await getDoc(doc(db, 'users', user.uid))
    if (!userExists.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    }
  }
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        createUser(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const signOut = () => {
    auth.signOut()
  }
  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuthContext }
