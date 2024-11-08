import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import fs from 'fs'

export const addDoctor = async (req, res) => {
try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const image = req.file; // Image will be here if uploaded using multer
  
    // check fro all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ){
    return res.json({success:false, message:"Missing Detail"})
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({success:false , message:"Please enter valid email"})
    }

    // validating strong passeword
    if (password.length <4) {
      return res.json({success:false , message:"Please enter a strong passeword"})
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    if (!image) {
      return res.json({ success: false, message: "Missing image file" });
    }

    // upload image to cloudianry
 const imageUpload = await cloudinary.uploader.upload(image.path,{resource_type: "image"})
    // const imageUpload = await cloudinary.uploader.upload(image.path.replace(/\\/g, "/"),{resource_type: "image"})

    const imageUrl = imageUpload.secure_url
    if( !imageUrl ){
      return res.json({success:false, message:"Failed to upload image"})
      } else{

        fs.unlink(image.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });

      }

  const doctorData = {
    image: imageUrl,
    name,
    email,
    password: hashedPassword, 
    speciality,
    degree, 
    experience, 
    about, 
    fees, 
    address,
    date: Date.now()
  }
  
  const newDoctor = new doctorModel(doctorData)
  await newDoctor.save() // save data in DataBase  

    console.log({name, email, password, speciality, degree, experience, about, fees, address },image)
    console.log('Parsed Address:', JSON.parse(address));

    return res.status(201).json({success:true , message: 'Doctor added successfully!' });
  
  } catch (error) {

    console.error('Error adding doctor:', error);
  return res.status(500).json({success:false , message: 'Failed to add doctor', error: error.message });
  }
};

export const loginAdmin = async (req,res) =>{
try {
  const {email,password} =req.body

if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {

  const token = jwt.sign(email+password ,process.env.JWT_SECRET)
  res.json({success:true,token})
} 
else {
  res.json({success:false , message: "Invalid Credential"})
}

} catch (error) {
  console.error('Error authenticate admin:', error);
  return res.status(500).json({success:false , message: 'Failed to authenticate admin', error: error.message });

}
}

// API to get all doctors list for admin panel
export const allDoctors = async (req,res)=> {
  try {
    const doctors = await doctorModel.find({}).select('-password')
    console.log('Doctors in backend:', doctors);
    res.json({success:true, doctors})
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false , message: error.message });
  
  }
}
