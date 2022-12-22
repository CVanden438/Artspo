import { BrowserRouter, Routes, Route } from 'react-router-dom'
import app from './firebase/firebase.config'
import Layout from './pages/Layout'
import Landing from './pages/Landing'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import Upload from './pages/Upload'
import NotFound from './pages/NotFound'
import ArtPage from './pages/ArtPage'
import EditProfile from './pages/EditProfile'
import ProtectedRoute from './pages/ProtectedRoute'
function App() {
  return (
    <div className='h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path='browse' element={<Browse />} />
            <Route path='profile/:user' element={<Profile />} />
            <Route path='upload' element={<Upload />} />
            <Route path='art/:art' element={<ArtPage />} />
          </Route>
          <Route
            path='/profile/edit'
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
