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
export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000'
export const currency = '$'

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
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
