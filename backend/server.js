import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

import bodyParser from 'body-parser'
import axios from 'axios';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

// app config
const app = express()
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())

// api endpoints
app.use('/api/admin',adminRouter)
// localhost:5000/api/admin/add-doctor

app.use('/api/doctor', doctorRouter)
app.use('/api/user' , userRouter)

app.get('/' ,(req,res)=>{
    res.send('API WORKING manoj 2')
})


const MERCHANT_BASE_URL="https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
const MERCHANT_STATUS_URL="https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status"

const redirectUrl="http://localhost:5000/status"
// const redirectUrl="http://localhost:5000/my-appointment"


const successUrl="http://localhost:5173/my-appointment"
const failureUrl="http://localhost:5173/my-appointment"

// app.post('/api/user/payment-phonepe', async (req, res) => {
//     const { appointmentId } = req.body;
//     console.log('phonepe payment in server.js')
//     const orderId = uuidv4(); // Generate unique order ID
//     const amount = 1000; // Example amount (in paisa)
//     const payload = {
//       merchantId: process.env.PHONEPE_MERCHANT_ID,
//       merchantTransactionId: orderId,
//       amount: amount,
//       merchantUserId: req.user.id,
//       // redirectUrl: `${process.env.PHONEPE_REDIRECT_URL}?id=${orderId}`,
//       redirectUrl: `${redirectUrl}?id=${orderId}`,

//       paymentInstrument: { type: 'PAY_PAGE' },
//     };
//     console.log('payload ',payload)
  
//     const payloadString = Buffer.from(JSON.stringify(payload)).toString('base64');
//     const checksum = crypto
//       .createHash('sha256')
//       .update(payloadString + '/pg/v1/pay' + process.env.PHONEPE_MERCHANT_KEY)
//       .digest('hex') + '###1';
  
//     const options = {
//       method: 'POST',
//       url: process.env.PHONEPE_BASE_URL + '/pg/v1/pay',
//       headers: {
//         accept: 'application/json',
//         'Content-Type': 'application/json',
//         'X-VERIFY': checksum,
//       },
//       data: { request: payloadString },
//     };
  
//     try {
//       const response = await axios.request(options);
//       console.log('PhonePe Response:', response.data);
//       if (response.data.success) {
//         return res.status(200).json({
//           success: true,
//           order: { redirectUrl: response.data.data.instrumentResponse.redirectInfo.url },
//         });
//       } else {
//         return res.status(400).json({ success: false, message: 'Payment initiation failed' });
//       }
//     } catch (error) {
//       console.error('Error in PhonePe payment:', error.message);
//       return res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
//   });
  

app.post('/create-order', async (req, res) => {

    const {name, mobileNumber, amount} = req.body;
    const orderId = uuidv4()

console.log('req body ',req.body )

    //payment
    const paymentPayload = {
        merchantId : process.env.PHONEPE_MERCHANT_ID,
        merchantUserId: name,
        mobileNumber: mobileNumber,
        amount : amount * 100,
        merchantTransactionId: orderId,
        redirectUrl: `${redirectUrl}/?id=${orderId}`,
        redirectMode: 'POST',
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    }

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
    const keyIndex = 1
    const string  = payload + '/pg/v1/pay' + process.env.PHONEPE_MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'POST',
        url:MERCHANT_BASE_URL,
        headers: {
            accept : 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data :{
            request : payload
        }
    }
    try {
        
        const response = await axios.request(option);
        console.log(response.data.data.instrumentResponse.redirectInfo.url)
         res.status(200).json({msg : "OK", url: response.data.data.instrumentResponse.redirectInfo.url})
    } catch (error) {
        console.log("error in payment", error)
        res.status(500).json({error : 'Failed to initiate payment'})
    }

});


app.post('/status', async (req, res) => {
    const merchantTransactionId = req.query.id;

    const keyIndex = 1
    const string  = `/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}` + process.env.PHONEPE_MERCHANT_KEY
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + keyIndex

    const option = {
        method: 'GET',
        url:`${MERCHANT_STATUS_URL}/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept : 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': process.env.PHONEPE_MERCHANT_ID
        },
    }

    axios.request(option).then((response) => {
        if (response.data.success === true){
            return res.redirect(successUrl)
        }else{
            return res.redirect(failureUrl)
        }
    })
});


app.listen(port, ()=> 
    console.log("Server Started" , port ) )


