import express from 'express'
import {addDoctor,allDoctors,loginAdmin, appointmentsAdmin, appointmentcancel, adminDashboard} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authmiddleware.js'
import { changeAvailablity } from '../controllers/doctorContoller.js'
// import AllApointments from '../../admin/src/pages/Admin/AllApointments.jsx'

const adminRouter = express.Router()
adminRouter.post('/add-doctor',authAdmin,upload.single('Image'),addDoctor)
adminRouter.post('/loginAdmin',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailablity)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentcancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter
