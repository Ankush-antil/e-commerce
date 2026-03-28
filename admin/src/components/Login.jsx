import { useState } from 'react'
import { toast } from 'react-toastify'
import '../style/Login.css'
import axios from "axios"
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000"
const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
     try {
        const response = await axios.post(
          `${backendUrl}/admin_login`,
          {
            email,
            password
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        const result = response.data;
        
             
            if(response.status === 200 ){
                const token = result.data
                localStorage.setItem("token", token)
                
                setEmail("")
                setPassword("")
                setToken(token)
                 toast.success(result.message)
                 
            } 
            
            else {
                toast.error(result.message)
            }
        }
        catch(error){
        if (error.response) {
          // server error response
          toast.error(error.response.data.message)
          
          ;
        } else {
          console.log(error.message);
        }
      }}
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">Admin Panel</h1>

        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <p className="form-label">Email Address</p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <p className="form-label">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login