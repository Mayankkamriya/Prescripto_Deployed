import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment,
     paymentPhonePe, verifyPhonePePayment,paymentstatus } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register' ,registerUser)
userRouter.post('/login' ,loginUser)

userRouter.get('/getProfile', authUser ,getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)

userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-Appointment', authUser, cancelAppointment)
userRouter.post('/payment-phonePe', authUser, paymentPhonePe)
userRouter.post('/verifyphonepe', authUser, verifyPhonePePayment)
userRouter.post('/create-order', authUser, paymentPhonePe)
userRouter.post('/status', paymentstatus)


export default userRouter
