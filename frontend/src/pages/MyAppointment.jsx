import React, { useContext, useEffect, useState } from 'react'
import Appointment from './Appointment.jsx'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointment = () => {
  const { token, getUserAppointments, appointments, cancelAppointment  } = useContext(AppContext)

  const backendurl = import.meta.env.VITE_BACKEND_URL
  
  // const [appointments, setAppointments] = useState([])
  const months= ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Srp", "Oct", "Nov", "Dec"]

 const navigate = useNavigate()


 const handlePayment = async (amount,id) =>{
  const data = {
    name: "mayank kamriya",
    mobileNumber:'1234567890',
    amount: amount*100,
    appointmentId : id,
    MUID:"MUIDW" + Date.now(),
    transactionId: "T" + Date.now(),
  }
  try {
    const response = await axios.post( backendurl + '/api/user/create-order', data, {headers:{token}})

    if (response.data && response.data.data.instrumentResponse.redirectInfo.url) {
        window.location.href= response.data.data.instrumentResponse.redirectInfo.url;
        console.log('Api Response Infrontend  ....',response.data)
      }


    // if (!response) return;
    
    console.log('response.data in frontend  ....',response.data)
    if (response.success) {
      console.log('response.success')
    }
    // window.location.href = response.data.url
  } catch (error) {
    console.log("error in payment", error)
  }
}

  const slotDateFormat = (slotDate)=> {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " "+ months[Number(dateArray[1])] +" "+ dateArray[2]
  }

// const initPay= (order)=>{
// const options= {
//   key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//   amount: order.amount,
//   currency: order.currency,
//   name:'Appointmnet Payment',
//   description: 'Appointment Payment',
//   order_id: order.id,
//   receipt: order.receipt,
//   handler: async(response)=>{
//     console.log(' payment response',response)
  
//   try {
//     const {data} = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, {headers:{token}})
//     if (data.success) {
//       getUserAppointments()
//       navigate('/my-appointments')
//     }
//   } catch (error) {
//     console.log(error)
//     toast.error(error.message)
  
//   }
  
//   }
// }
// }
 

// const initPhonePePay = (order) => {
//   const { redirectUrl } = order;
//  console.log('redirectUrl ',redirectUrl)
//   if (redirectUrl) {
//     // Redirect user to PhonePe payment page
//     window.location.href = redirectUrl;
//   } else {
//     console.error('Invalid PhonePe order details: Missing redirect URL');
//     toast.error('Payment initiation failed');
//   }
// };



// const appointmentPhonePe = async (appointmentId) => {
//   try {
//     const { data } = await axios.post( backendUrl + '/api/user/payment-phonepe', {appointmentId }, { headers:{token}});
//     console.log("API Response....: ", data); 

//     if (data.success) {
//       // Initiate payment with PhonePe order details
//       console.log('PhonePe order data:', data.order);
//       initPhonePePay(data.order);
//     } else {
//       console.error('PhonePe payment initiation failed.');
//     }
//   } catch (error) {
//     console.error('Error in PhonePe payment request:', error);
//   }
// };


// const appointmentRozarpay = async (appointmentId) =>{
//   try {
//     const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay', {appointmentId},{headers: {token}})
//     if (data.success) {
//       // initPay(data.order)
//       console.log('order data',data.order)
      
//     }  else {
//       console.log('data not sending success in Razorpay')
//     }
    
//   } catch (error) {
//     console.error('Error in Razorpay payment request:', error);
//   }
//   }


useEffect(()=>{
  if (token) {
    getUserAppointments()
  }
},[token])

  return (
    <div>
    <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>MyAppointment</p>
    <div>
      {appointments.map((item,index) => {
        return (
        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
          <div>
            <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
          </div>
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
            <p>{item.docData.speciality}</p>
            <p className='text-zinc-700 front-medium mt-1'>Address:</p>
            <p className='text-xs'>{item.docData.address.line1}</p>
            <p className='text-xs'>{item.docData.address.line2}</p>
            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>  {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
          </div>
          <div></div>
          <div className='flex flex-col gap-2 justify-end'>
            { item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50 '>Paid</button> }
            {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => handlePayment(item.amount*100,item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button> } 
                        
            {/* {!item.cancelled && !item.payment && <button onClick={()=>appointmentPhonePe(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button> } */}

            {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>cancel appointment</button> }

            {item.cancelled && !item.isCompleted &&  <button className='sm:min w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button> }
            {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>  }
          </div>
        </div>
      )
      })}
    </div>



    <Appointment/>
    </div>
  )
}

export default MyAppointment