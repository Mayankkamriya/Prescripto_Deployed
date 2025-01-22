import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

const changeAvailablity = async (req, res)=>{
  try {
    const {docId}= req.body 
    const docData = await doctorModel.findById(docId)
    
    await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
    res.json({success:true, message: 'Availablity changes'})

  } catch (error) {
    console.log(error)
    res.json({success:false , message:error.message})
  }
}

const doctorList = async (req, res)=>{
  try {
    // const totalDoctorsPromise = await doctorModel.countDocuments({});
    const limit = Math.min( parseInt(req.query.limit) ||  40);

    const doctors = await doctorModel.find({})
    .select(['-password' , '-email'])
    .limit(limit);

      // Encode the Doctors data
      const encodedto = `${process.env.ENCODETO}`
      const encodedDoctors = Buffer.from(JSON.stringify(doctors)).toString(encodedto);
     
      res.json({ success: true, data: encodedDoctors });

    // res.json({success:true,doctors})

} catch (error) {
    console.log(error)
        res.json({success:false , message:error.message}) 
  }  
}

//API for doctor login
const loginDoctor = async(req,res)=>{
  try {
    const {email,password} = req.body
    const doctor = await doctorModel.findOne({email})
    
        if (!doctor) {
          return res.json({success:false, message:'Doctor not exist'})
        }

    const isMatch = await bcrypt.compare(password, doctor.password)

    if (isMatch) {
      const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
      res.json({success:true, token})
    } else {
      res.json({success:false, message:'Invalid Credentials'})
    }

  } catch (error) {
    console.log(error)
    res.json({success:false, message:error})
  }
}

// API to get doctor appointments for doctor pannel
const appointmentsDoctors = async (req,res) =>{
  try {
    const {docId} = req.body

    if (!docId) {
      return res.json({ success: false, message: 'Doctor ID is required' });
    }
    const appointments = await appointmentModel.find({docId})
    console.log("Appointments1   :", appointments);
    res.json(appointments)

  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

//API to mark appointment complete for doctor panel
const appointmentComplete = async (req, res) =>{
  try {
    const {docId,appointmentId }= req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    
    if (appointmentData && appointmentData.docId === docId) {
         
      await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
      return res.json({success:true, message:'Appoitnmemnt Completed'})

    } else {
      return res.json({success:false, message:'Mark Failed'})
    }
    
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

//API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) =>{
  try {
    const {docId,appointmentId }= req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    
    if (appointmentData && appointmentData.docId === docId) {
         
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
      return res.json({success:true, message:'Appoitnmemnt Cancelled'})

    } else {
      return res.json({success:false, message:'Cancellation Failed'})
    }
    
  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

//API to get dashbord data for doctor panel
const doctorDashboard = async(req,res) => {
  try {
    const {docId} = req.body
    const appointments = await appointmentModel.find({docId})

    let earnings =0
     appointments.map((item)=>{
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
     })

     let patients= []
     appointments.map((item)=>{
      if (!patients.includes(item.userId)) {
        patients.push(item.userId)
      }
     })

     const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppoitnments: appointments.reverse().slice(0,5)
     }
     res.json({success:true, dashData})


  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

// API to get doctor profile from Doctor Panel 
const doctorProfile = async (req,res) =>{
  try {
    
    const {docId} =req.body
    const ProfileData = await doctorModel.findById(docId).select('-password')

    res.json({success:true, ProfileData})

  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

// API to get update profile from Doctor Panel
const updateDoctorProfile = async (req,res) =>{
  try {
    
    const {docId, fees, address, available} =req.body
     await doctorModel.findByIdAndUpdate(docId, {fees, address, available})

    res.json({success:true, message: 'Profile Updated'})

  } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
  }
}

export {changeAvailablity,doctorList, loginDoctor,
   appointmentsDoctors, appointmentComplete, 
   appointmentCancel, doctorDashboard, doctorProfile,
   updateDoctorProfile }
