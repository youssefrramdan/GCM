const express=require("express");
const mongoose=require("mongoose")
const app=express();
const port =1000;
const {createUser}=require("./service/userService")
const dbConnection =require("./config/dbConnection")
const mainRoutes=require("./routes/mainRoute")
const appError =require("./utils/appError")
const dotenv=require("dotenv");
const globelError=require("./middelware/globelError")



app.use(express.json())
dotenv.config({path:"config.env"})
dbConnection();


app.listen(process.env.port,()=>{
    console.log("app listen on port 1000")
    console.log("app listen on port 1000")
   
    
})

mainRoutes(app);



app.use("*",(req,res,next)=>{
   
    next(new appError(`cant find this url ${req.originalUrl}`,400))
})

app.use(globelError)
