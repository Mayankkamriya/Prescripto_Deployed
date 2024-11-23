import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-sm'>
        {/*--------------- Left side ----------------*/}
        <div>

            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-1/2 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

        </div>

        {/*--------------- Center side ----------------*/}
        <div>
            <p className='text-xl font-medium mb-5' >COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>

            <li className="hover:text-black" > <NavLink onClick={()=>scrollTo(0,0)} to='/'> HOME </NavLink></li>
            <li className="hover:text-black" > <NavLink onClick={()=>scrollTo(0,0)} to='/about'> ABOUT US </NavLink></li>
            <li className="hover:text-black" > <NavLink onClick={()=>scrollTo(0,0)} to='/contact'> CONTACT US </NavLink></li>                   
            <li>PRIVACY & POLICY</li>

            </ul>
        </div>

        {/*--------------- Right side ----------------*/}
        <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 825-303-8815</li>
            <li>kamriyamayank45@gmail.com</li>
        </ul>
        </div>

    </div>
        {/*-----------Copyright Text-----------*/}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024 @ Prescripto.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer