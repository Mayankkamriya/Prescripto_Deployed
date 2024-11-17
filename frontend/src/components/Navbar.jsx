import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()
  const {token,setToken, userData} = useContext(AppContext)

const [showMenu, setShowMenu]= useState(false)

  const logout = ()=>{
    setToken( false )
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='flex item-center justify-between text-sm py-4 mb-5 border-b border-b-green'>
      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="logo" />

    <ul className='hidden md:flex items-start gap-5 front-medium'>  {/* 'md:flex hidden' for display hidden and none in medium size screen*/}
      <NavLink to='/'>
        <li className='py-1' >HOME</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
      </NavLink>
      <NavLink to='/doctor' >
        <li className='py-1' >All DOCTOR</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
      </NavLink>
      <NavLink to='/about'>
        <li className='py-1' >ABOUT</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
      </NavLink>
      <NavLink to='/contact'>
        <li className='py-1' >CONTACT</li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
      </NavLink>
    </ul>
    <div className='flex items-center gap-4'>{
      token && userData
      ? 

      <div className="relative flex items-center gap-2 cursor-pointer group">
  {/* Profile Picture and Dropdown Icon */}
  <div className="flex items-center gap-2 cursor-pointer">
    <img className="w-8 rounded-full" src={userData.image} alt="Profile" />
    <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown Icon" />
  </div>

  {/* Dropdown Menu */}
  <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4         opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity         hidden group-hover:block z-10">
    <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
    <p onClick={() => navigate('/my-appointment')} className="hover:text-black cursor-pointer">My Appointment</p>
    <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
  </div>
</div>

      :<button onClick={() =>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
  }
    </div>


    </div>
  )
}

export default Navbar