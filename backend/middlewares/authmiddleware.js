import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req,res,next)=>{
    try {
        const {atoken} =req.headers // take token from headers

        if (!atoken) {
    return res.json({success:false, message:'Not Authorized Login Again'})
}

// we get decoded token it means email and password 
const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    return res.json({success:false, message:'wrong credential Login Again'})
}
next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default authAdmin
