import './App.css'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Reviews from './pages/Reviews'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || '')

  return (
    <div className="app-container">
      <ToastContainer />

      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className="app-body">
            <Sidebar />
            <div className="app-content">
              <Routes>
                <Route path="/" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/reviews" element={<Reviews token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
