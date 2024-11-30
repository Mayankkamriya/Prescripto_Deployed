import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllApointments = () => {
  const {atoken, appointments, getAllAppointments, cancelAppointment, CompleteAppointment} = useContext(AdminContext)
  const {calculateAge, slotDateFormat, currency} = useContext(AppContext)

  useEffect(()=>{
    if (atoken) {
      getAllAppointments()
    }
  },[atoken])


return (
<div className='w-full max-w-6xl m-5'>
  <p className='mb-3 text-lg font-medium'>All Appointments</p>
    <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
      <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctors</p>
        <p>Fees</p>
        <p>Actions</p>
      </div>

      {appointments.slice().reverse().map((item,index)=>(
        <div className='grid grid-wrap justify-between max-sm:gap-2 sm-grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
          <p className='max-sm:hidden'> {index+1} </p>
          <div className='flex items-center gap-2'> 
            <img className='w-8 rounded-full' src={item.userData.image} alt="" /> 
            <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'> {calculateAge(item.userData.dob)} </p>
            <p> {slotDateFormat(item.slotDate)}, {item.slotTime} </p>
            <div className='flex items-center gap-2'> 
            <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /> 
            <p>{item.docData.name}</p>
            </div>
            <p> {currency}{item.amount} </p>
            {
            item.cancelled 
            ?
            ( item.payment ? 
              <div className=''>
                <p className='text-gray-00 text-sm font-medium'>Paid</p>
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              </div>
              :
            <p className='text-red-400 text-xs font-medium'>Cancelled</p> 
            )
            : item.isCompleted
              ? <p className='text-green-500 text-xs font-medium'>Completed</p>
              : ( item.payment ? 
              <div className='grid grid-rows-2 items-center '>
                <p className='text-gray-00 text-sm font-medium row-span-1 text-center'>Paid</p>
                <div className='flex items-center justify-center flex-row row-span-1'>
                  <img onClick={()=> cancelAppointment(item._id)} className='w-10 cursor-pointer pt-0' src={assets.cancel_icon} alt="" />
                  <img onClick={()=> CompleteAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                </div>
              </div>
              : <div className='flex items-center justify-center '>
              <img onClick={()=> cancelAppointment(item._id)} className='w-10 cursor-pointer mb-2' src={assets.cancel_icon} alt="" />
              <img onClick={()=> CompleteAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
            </div>
              )
            }
        </div>

))}


    </div>

</div>
  )
}

export default AllApointments