import React from 'react'
import { useState } from 'react'

const Login = () => {
  const [state,setState] =useState('Sign Up')
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [name,setname] =useState('')
  
const onSubmitHandler = async (event)=>{
  event.preventDefault()
}

 

  return (
  <form className='min-h-[80vh] flex items-center' action=""> 
    <div className= 'flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg '>
      <p className='text-2xl font-semibold'> {state === 'Sign Up' ? "Create Account" : "Login" }</p> {/* if sign up show Create Account */}
      <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
      
      {
        state === 'sign up' &&
      <div>
        <p className='w-full'>Full Name</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=> setname(e.target.name)} value={name} required/>
      </div>
      }

      <div>
        <p className='w-full'>Email</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=> setEmail(e.target.email)} value={email} required/>
      </div>
      <div>
        <p className='w-full'>Password</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=> setPassword(e.target.password)} value={password} requiredk/>
      </div>
      <button className='bg-primary text-white w-full py-2 rounded-md text-base'> { state === 'Sign Up' ? "Create Account" : "Login"} </button>
      {
        state === "Sign Up"
        ? <p>Already have an account? <span onClick={()=> setState('Login')} className='text-primary underline cursor-pointer'>Login</span></p>
        : <p>Create an new account? <span onClick={()=> setState('Sign Up')} className='text-primary underline cursor-pointer'> Sign Up</span></p>
      }
    
    </div>
  </form>
  )
}

export default Login