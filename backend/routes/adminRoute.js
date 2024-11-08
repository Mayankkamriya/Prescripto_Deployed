import express from 'express'
import {addDoctor,allDoctors,loginAdmin} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authmiddleware.js'

const adminRouter = express.Router()
adminRouter.post('/add-doctor',authAdmin,upload.single('Image'),addDoctor)
adminRouter.post('/loginAdmin',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)

export default adminRouter
