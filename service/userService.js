const userModel =require("../models/userModel.js")
const asyncHandler = require('express-async-handler')
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');


const uploadSingleImage=require("../middelware/uploadImage.js")
const uploadUserImage=uploadSingleImage("image")
const resizeImage=asyncHandler(async(req,res,next)=>{

    if(req.file){
        const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`
        sharp(req.file.buffer).resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`uploads/user/${fileName}`)

        req.body.image=fileName
       
    }
    next();

})

const createUser=asyncHandler(async(req,res,next)=>{

    const user=await userModel.create(req.body)
    res.json({status:"sucess",date:user})


})
const getUser=asyncHandler(async(req,res,next)=>{
    const user = await userModel.find();
    res.json({status:"sucess",data:user})
})
const getSpecificUser=asyncHandler(async(req,res,next)=>{
    const user =await userModel.findById(req.params.id)
    if(!user){
        res.status(400).json({message:`can not find this id ${req.params.id}`})
    }
    else{
        res.json({status:"sucess",data:user})
    }
  
    
})
const deletUser=asyncHandler(async(req,res)=>{
    const user=await userModel.findByIdAndDelete(req.params.id)

    if(!user){
        res.status(400).json({message:`can not find this id ${req.params.id}`})

    }
    else{
        res.json(`the user from this id ${req.params.id} is deleted`)

    }
    
})





module.exports={
    createUser,
    getUser,
    getSpecificUser,
    deletUser,
    uploadUserImage,
    resizeImage

}
