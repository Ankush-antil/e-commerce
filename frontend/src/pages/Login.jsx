import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../style/Login.css';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  async function onSubmitHandler(e){
    e.preventDefault()
   
    if(currentState === "Sign Up"){
      try {
        const response = await axios.post(
          `${backendUrl}/user_register`,
          {
            name,
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
                localStorage.setItem("userId", result.user_id)
                setName("")
                setEmail("")
                setPassword("")
                setToken(token)
                 toast.success(result.message)
                 navigate("/")
            } 
            
            else {
                toast.error(result.message)
            }
        }
        catch(error){
        if (error.response) {
          // server error response
          toast.error(error.response.data.message)
          setCurrentState('Login')
          ;
        } else {
          console.log(error.message);
        }
      }
    }
    else {
      try {
        const response = await axios.post(
         `${backendUrl}/user_signup`,
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
          
            if(response.status === 200){
                const token = result.data
                localStorage.setItem("token", token)
                localStorage.setItem("userId", result.user_id)
                setEmail("")
                setPassword("")
                 toast.success(result.message)
                 navigate("/")
            }
            else{
                toast.error(result.message)
            }
        }
        catch(error){
          if (error.response) {
            toast.error(error.response.data.message)
          } else {
            console.log(error.message);
          }
        }
    }  
  }
 

  return (
    <form className="login-form" onSubmit={onSubmitHandler}>
      <div className="login-title">
        <p>{currentState}</p>
        <span></span>
      </div>

      {currentState === 'Sign Up' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

    <div className="login-links">
        {currentState === 'Login' ? (
        <p className="link-text"> Does not have an account?{' '}
        <span className="link" onClick={() => setCurrentState('Sign Up')}> Create account </span>
        </p>
        ) : (
        <p className="link-text">
        Already have an account?{' '}
        <span className="link" onClick={() => setCurrentState('Login')}> Login Here </span>
        </p>
    )}
    </div>

      <button type="submit">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;