// import {v2 as cloudinary} from 'cloudinary';
import Cloudinary from 'Cloudinary';

const connectCoudinary = async() =>{
    Cloudinary.config({
        cloud_name : process.env.CLOUDINARY_NAME,
        api_secret : process.env.CLOUDINARY_SECRET_KEY,
        api_key : process.env.CLOUDINARY_API_KEY
    })
    console.log(".      Cloudinary configured successfully:");
    // console.log(cloudinary.config());
}
export default connectCoudinary
