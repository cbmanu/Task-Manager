const jwt=require('jsonwebtoken')
const User=require('../models/user')


const auth=async(req,res,next)=>{
    const token=req.cookies.token;
    try{        
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user =await User.findOne({_id:decoded._id,'tokens.token':token})
        
        if(!user){
            throw new Error()
        }
        req.token=token
        req.user=user
        next()
    }catch(e){
        res.clearCookie("token")
        return res.redirect("/signUp")
    }
}
module.exports=auth