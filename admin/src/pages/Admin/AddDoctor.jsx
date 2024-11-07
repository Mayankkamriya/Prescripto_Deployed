import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import axios  from 'axios'
import { toast } from 'react-toastify'

const AddDoctor = () => {

const [docImg,setdocImg] = useState(false)
const [Name,setName] = useState('')
const [Email,setEmail] = useState('')
const [Password,setPassword] = useState('')
const [Experience,setExperience] = useState('1 Year')
const [Fees,setFees] = useState('')
const [About,setAbout] = useState('')
const [Speciality,setSpeciality] = useState('General physician')
const [Degree,setDegree] = useState('')
const [Address1,setAddress1] = useState('')
const [Address2,setAddress2] = useState('')

const {backendUrl, atoken} = useContext(AdminContext)

const onSubmitHandler = async (event)=> {
  event.preventDefault()

try {
  if (!docImg) {
    return toast.error('Image Not Selected')
  }

  const formData = new FormData()
  formData.append('Image' ,docImg)
  formData.append('name' ,Name)
  formData.append('email' ,Email)
  formData.append('password' ,Password)
  formData.append('experience' ,Experience)
  formData.append('fees' ,Number(Fees))
  formData.append('about' ,About)
  formData.append('speciality' ,Speciality)
  formData.append('degree' ,Degree)
  formData.append('address' ,JSON.stringify({line1:Address1, line2:Address2}))

//console log formdata
formData.forEach((value,key)=>{
  console.log(`${key} :${value} `)
})

const {data} =await axios.post(backendUrl +'/api/admin/add-doctor',formData,
  {  headers: { 
      'atoken': atoken, 
      'Content-Type': 'multipart/form-data' 
    }}
  )

if(data.success){
  toast.success(data.message)
} else {
  toast.error(data.message)
}

} catch (error) {
  console.error("Error:", error);
  toast.error(error.response?.data?.message || "Server error occurred");
}

}


return (
<form onSubmit={onSubmitHandler} className='m-5 w-full'>
  <p className='mb-3 text-lg font-medium' >Add Doctor</p>

<div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
  <div className='flex items-center gap-4 mb-8 text-gray-500'>
    <label  htmlFor="doc-img">
      <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" />
    </label>
    <input onChange={(e)=> setdocImg(e.target.files[0])} className='border rounded px-3 py-2' type="file" id="doc-img" hidden />
    <p>Upload doctor <br />picture</p>
  </div>

  <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
    <div className='w-full lg:flex-1 flex flex-col gap-4'>

      <div className='flex-1 flex flex-col gap-1'> 
        <p>Doctor name</p>
        <input onChange={(e)=> setName(e.target.value)} value={Name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
      </div>

      <div className='flex-1 flex flex-col gap-1'> 
        <p>Doctor Email</p>
        <input onChange={(e)=> setEmail(e.target.value)} value={Email} className='border rounded px-3 py-2' type="email" placeholder='Email' required  autoComplete="email" />
      </div>

      <div className='flex-1 flex flex-col gap-1'> 
        <p>Doctor Password</p>
        <input onChange={(e)=> setPassword(e.target.value)} value={Password} className='border rounded px-3 py-2' type="password" placeholder='Password' required  autoComplete="current-password"/>
      </div>

      <div className='flex-1 flex flex-col gap-1'> 
        <p>Experience</p>
        <select onChange={(e)=> setExperience(e.target.value)} value={Experience} name="" id="experience-select">
          <option value="1 Year">1 Year</option>
          <option value="2 Year">2 Year</option>
          <option value="3 Year">3 Year</option>
          <option value="4 Year">4 Year</option>
          <option value="5 Year">5 Year</option>
          <option value="6 Year">6 Year</option>
          <option value="7 Year">7 Year</option>
          <option value="8 Year">8 Year</option>
          <option value="9 Year">9 Year</option>
          <option value="10 Year">10 Year</option>
        </select>
      </div>

      <div className='flex-1 flex flex-col gap-1'> 
        <p>Fees</p>
        <input onChange={(e)=> setFees(e.target.value)} value={Fees} className='border rounded px-3 py-2' type="number" placeholder='fees' required />
      </div>
    </div>

  <div className='w-full lg:flex-1 flex flex-col gap-4'>
    <div className='flex-1 flex flex-col gap-1'>
      <p>Speciality</p>
      <select onChange={(e)=> setSpeciality(e.target.value)} value={Speciality} name="" id="speciality-select">
        <option value="General physician">General physician</option>
        <option value="Pediatricians">Pediatricians</option>
        <option value="Gynecologist">Gynecologist</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Neurologist">Neurologist</option>
        <option value="Gastroenterologist">Gastroenterologist</option>
      </select>
    </div>

  <div className='flex-1 flex flex-col gap-1'> 
    <p>Education</p>
    <input onChange={(e)=> setDegree(e.target.value)} value={Degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
  </div>

  <div className='flex-1 flex flex-col gap-1'> 
    <p >Address</p>
    <input onChange={(e)=> setAddress1(e.target.value)} value={Address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
    <input onChange={(e)=> setAddress2(e.target.value)} value={Address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
  </div>
</div>
</div>

<div > 
  <p className='mt-4 mb-2'>About Doctor</p>
  <textarea onChange={(e)=> setAbout(e.target.value)} value={About} className='w-full px-4 pt-2 border roundeed' placeholder='Write about doctor' row={5} required />
</div>

<button  type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add doctor</button>

</div>
  </form>
  )
}

export default AddDoctor