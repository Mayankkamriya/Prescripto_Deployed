import React, { useContext, useState, useEffect }  from 'react'
import {AppContext} from '../../../admin/src/context/AppContext'
import { DoctorContext } from '../../../admin/src/context/DoctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

  const {dToken, ProfileData, setProfileData, getProfileData, backendUrl, updateProfile} = useContext(DoctorContext)
  const {currency} = useContext(AppContext)

const [isEdit, setisEdit] = useState(false)

const handleUpdateProfile = async () =>{
  try {
    const updateData = {
    address: ProfileData.address ,
    fees: ProfileData.fees,
    available: ProfileData.available,
    }

    const result = await updateProfile(updateData);
    if (result.success) {
      toast.success(result.message)
      setisEdit(false);
      getProfileData()
    } else {
          toast.error(result.message)
        }
  } catch (error) { 
    toast.error(error.message)
    console.log(error.response)
  }
}

useEffect(()=>{
  if (dToken) {
    getProfileData()
  }
},[dToken])

return ProfileData && (
  <div>

    <div className='flex flex-col gap-4 m-5'>
      
      <div>
        <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={ProfileData.image} alt="" />
      </div>

      <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
        {/* -------Doc Info : name, degree, experience ----- */}
        <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{ProfileData.name}</p>
        <div className='flex items-center gap-2 mt-1 text-gray-600'>
          <p>{ProfileData.degree} - {ProfileData.speciality}</p>
        </div>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{ProfileData.experience}</button>
      </div>

      {/* -------- Doc About --------- */}
       <div>
        <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{ProfileData.about}</p>
      </div>

      <p className='text-gray-600 font-medium mt-4'>
        Appointment fee: <span className='text-gray-800'>{currency} {isEdit? <input type="number" onChange={(e) => setProfileData(prev=>({...prev, fees: e.target.value}))} value={ProfileData.fees} /> : ProfileData.fees}</span>
      </p>
      <div className='flex gap-2 py-2'>
       <p>Address:</p>
       <p className='text-sm'>
          {isEdit ? <input type="text" onChange={(e)=> setProfileData(prev=>({...prev, address: e.target.value}))} value={ProfileData.address} /> : ProfileData.address}
           {/*  { isEdit ? <input type="text" onChange={(e)=> setProfileData(prev=>({...prev, address,line1:e.target.value}))} value={ProfileData.address.line1} /> : ProfileData.address.line1} */}
          {/* <br /> */}
           {/*  { isEdit ? <input type="text" onChange={(e)=> setProfileData(prev=>({...prev, address,line2:e.target.value}))} value={ProfileData.address.line2} /> : ProfileData.address.line2} */}
           </p>
      </div>

      <div className='flex gap-1 pt-2'>  
        <input onChange={()=> isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={ProfileData.available} type="checkbox"  />
        <label htmlFor="">Available</label>
      </div>

      {
        isEdit
        ? <button onClick={handleUpdateProfile } className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
        : <button onClick={()=> setisEdit(true) } className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
      }

    </div> 


  </div>
)
}

export default DoctorProfile