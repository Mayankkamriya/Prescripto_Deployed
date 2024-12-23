import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate  } from 'react-router-dom'

const Footer = () => {

    const handleClick = () => {

        navigate('/');
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // For smooth scrolling
          });
    }

    const navigate = useNavigate()
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-sm'>
        {/*--------------- Left side ----------------*/}
        <div>

            <img onClick={handleClick} className='mb-5 w-40 cursor-pointer transition-opacity duration-1500 hover:opacity-80 ' src={assets.logo} alt="" />
            <p className='w-full md:w-1/2 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>

        </div>

        {/*--------------- Center side ----------------*/}
        <div>
            <p className='text-xl font-medium mb-5' >COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>

            <li className="hover:text-black" > <NavLink onClick={()=> window.scrollTo({top: 0, behavior: 'smooth' } )} to='/'> HOME </NavLink></li>
            <li className="hover:text-black" > <NavLink onClick={()=> window.scrollTo({top: 0, behavior: 'smooth' } )} to='/about'> ABOUT US </NavLink></li>
            <li className="hover:text-black" > <NavLink onClick={()=> window.scrollTo({top: 0, behavior: 'smooth' } )} to='/contact'> CONTACT US </NavLink></li>                   
            <li>PRIVACY & POLICY</li>

            </ul>
        </div>

        {/*--------------- Right side ----------------*/}
        {/* <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91 825-303-8815</li>
            <li>kamriyamayank45@gmail.com</li>
        </ul>
        </div> */}

<div>
    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
    <ul className='flex flex-col gap-2 text-gray-600'>
        {/* <li>+91 825-303-8815</li> */}
        <li>
            <a 
                href="tel:+918253038815" 
                className="text-gray-600 "
            >
                +91 8253038815
            </a>
        </li>
        <li>
            <a 
                href="mailto:kamriyamayank45@gmail.com?subject=Hello Prescripto&body=I would like to get in touch with you." 
                className="text-gray-600 "
            >
                kamriyamayank45@gmail.com
            </a>
        </li>
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