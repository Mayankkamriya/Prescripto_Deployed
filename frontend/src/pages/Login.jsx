import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const [state,setState] =useState('Sign Up')
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [name,setname] =useState('')
  
const onSubmitHandler = async (event)=>{
  event.preventDefault()

  try {
    if (state === 'Sign Up') {
      const {data} = await axios.post(backendUrl + '/api/user/register' ,{name,email,password})
      if (data.success) {
        console.log('Token:', data.token); 
        localStorage.setItem('token',data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {
      const {data} = await axios.post(backendUrl + '/api/user/login' ,{email,password})
      if (data.success) {
        // console.log('Login Success:', data);
        localStorage.setItem('token',data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    }
    
  } catch (error) {
    console.error('Login/Register Error:', error);
    toast.error(error.message)
  }
}

useEffect(()=>{
  if (token) {
    navigate('/')
  }
}, [token])
 
 // Navigate to Admin Login
 const redirectToAdminLogin = () => {
  navigate('/admin/login') // Assuming '/admin/login' is your admin login route
}

  return (
    <div>
  <form onSubmit={onSubmitHandler}  className='min-h-[80vh] flex items-center' action=""> 
    <div className= 'flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg '>
      <p className='text-2xl font-semibold'> {state === 'Sign Up' ? "Create Account" : "Login" }</p> {/* if Sign Up show Create Account */}
      <p>Please {state === 'Sign Up' ? "Sign Up" : "log in"} to book appointment</p>
      
      {
        state === 'Sign Up' &&
      <div>
        <p className='w-full'>Full Name</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=> setname(e.target.value)} value={name} required/>
      </div>
      }

      <div>
        <p className='w-full'>Email</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=> setEmail(e.target.value)} value={email} required/>
      </div>
      <div>
        <p className='w-full'>Password</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=> setPassword(e.target.value)} value={password} required/>
      </div>
      <button type='Submit' className='bg-primary text-white w-full py-2 rounded-md text-base'> { state === 'Sign Up' ? "Create Account" : "Login"} </button>
      {
        state === "Sign Up"
        ? <p>Already have an account? <span onClick={()=> setState('Login')} className='text-primary underline cursor-pointer'>Login</span></p>
        : <p>Create an new account? <span onClick={()=> setState('Sign Up')} className='text-primary underline cursor-pointer'> Sign Up</span></p>
      }
    <p>Login as <span onClick={redirectToAdminLogin} className='text-primary underline cursor-pointer'> Doctor</span></p>
    </div>
    </form>

  </div> )
}

export default Login