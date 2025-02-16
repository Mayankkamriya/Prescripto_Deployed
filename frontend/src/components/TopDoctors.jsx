import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loader from './Loader';

const TopDoctors = () => {
const {doctors} = useContext(AppContext)
const navigate = useNavigate()

const [loading, setLoading] = useState(true);
const [doctorsToShow, setDoctorsToShow] = useState([]);

useEffect(() => {
        if(doctors.length>0){
        const doctorsSubset = window.innerWidth < 640 ? doctors.slice(0, 5) : doctors.slice(0, 10);
        setDoctorsToShow(doctorsSubset);
        setLoading(false);
        }
  }, [doctors]);

  return (
    <div className='flex flex-col items-center gap-4 mt-0 mb-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        
        {
            loading ? (
                <div className='flex justify-center items-center h-96'>
                    <Loader/>
                </div>
            ) : (
        
        <div className='w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctorsToShow.map((item,index)=>( 
            <div onClick={()=>{ navigate(`/my-appointment/${item._id}`);  window.scrollTo({top: 0, behavior: 'smooth' } ) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] tranition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                    <div className= {`flex items-center gap-2 text-sm text-center  ${item.available ? 'text-green-500 max-sm:text-[13px] ' : 'text-gray-500 max-sm:text-[13px]' }`}>  
                        <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500' } rounded-full`}></p>
                        <p>{item.available ? 'Available' : 'Not Available' }</p>
                    </div> 
                <p className='text-gray-900 max-sm:text-[16px] text-lg font-medium' >{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
            </div>
            ))}
        </div>
        )
    }
     { !loading && (
           <button onClick={()=>{navigate('/doctor');  window.scrollTo({top: 0, behavior: 'smooth' } ) }} 
        className='bg-blue border text-gray-600 px-12 py-3 rounded-full mt-10 transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 focus:bg-primary active:bg-primary'>All Doctors</button>
     )} 
    </div>
  )
}

export default TopDoctors