const  jwt = require('jsonwebtoken');
const asyncHandler= require("express-async-handler")
const userModel =require("../models/userModel")
const bcrypt = require('bcrypt');
const appError =require("../utils/appError")

const createToken=(payload)=>{
    const token=jwt.sign({userId:payload},process.env.JWT_SECRET_KEY,
    {expiresIn:process.env.JWT_EXPIRE_TIME}
    )
    return token;

}

const signUp= asyncHandler(async(req,res)=>{
    const user=await userModel.create(req.body)
    const token=createToken(user._id)
    
    res.status(200).json({data:user,token:token})

})

const login=asyncHandler(async(req,res,next)=>{
    const user=await userModel.findOne({email:req.body.email})

    if(!user || !(bcrypt.compare(req.body.password,user.password))){
        return next(new appError("email or password are not correct"))

    }
    const token =createToken(user._id)
    res.status(200).json({data:user,token:token})
})

const protect=asyncHandler(async(req,res,next)=>{
    let token;
   
    
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
       
       
    }
   
    
    if(!token){
        return next(new appError("you are not loged in",400))   
    }
   const decoded=await jwt.decode(token,process.env.JWT_SECRET_KEY)
   
  
   const date =new Date(decoded.iat)
   const currentUser=await userModel.findById(decoded.userId)
  
   if(!currentUser){
    return next(new appError("user no longer exist"))
   }
   const passwordTimeStapm=parseInt(
    currentUser.passwordChangedAt/1000
    ,10
   );
 
   if(passwordTimeStapm>decoded.iat){
    return next(new appError("you are recently changed your password pleace log in again "))

   }
   req.currentUser=currentUser;
  
   next()
   


})

const allowedTo=(...roles)=>{
    return(asyncHandler(async(req,res,next)=>{
        if(!roles.includes(req.currentUser.rolle)){
            return next(new appError("you are not allowed to access this rout"))
        }
        next();
    }))
}


module.exports={
    signUp,
    login,
    protect
}



