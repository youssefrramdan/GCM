const { error } = require("console");
const appError=require("../utils/appError");
const { stack } = require("../routes/userRoute");
const globelError=(err,req,res,next)=>{
  
    err.statusCode=err.statusCode||500;
    err.status=err.status|| "failed"

   
   
    const sendErrorForDev=(err,res)=>{
  
       
        res.status(err.statusCode).json({
            statusCode:err.statusCode,
            status:err.status,
            error:err,
            message:err.message,
            stack:err.stack
        })

        
    
    }

if(process.env.NODE_ENV=="development "){
   
sendErrorForDev(err,res);
}


}
module.exports=globelError
