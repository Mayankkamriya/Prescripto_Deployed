import express from 'express'
import { doctorList, loginDoctor, appointmentsDoctors, appointmentComplete, appointmentCancel } from '../controllers/doctorContoller.js'
import authDoctor from '../middlewares/authDoctor.js'
const doctorRouter = express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctors)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)

export default doctorRouter
