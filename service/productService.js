const asyncHandler = require('express-async-handler')
const productModel=require("../models/productModel")
const uploadSingleImage =require("../middelware/uploadImage")
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const uploadProductImage=uploadSingleImage("image")
const resizeImage=asyncHandler(async(req,res,next)=>{
  if(req.file){
    const fileName= `product-${uuidv4()}-${Date.now()}.jpeg`
    sharp(req.file.buffer).resize(600,600)
    .toFormat("jpeg")
    .jpeg({quality:90})
    .toFile(`uploads/product/${fileName}`)
    req.body.image=fileName
  }
    next()
})



const createProduct=asyncHandler(async(req,res)=>{
    const user =await productModel.create(req.body)
    res.json({status:"sucess",data:user})
})

const getProduct=asyncHandler(async(req,res)=>{
    const user=await productModel.find();
    if(!user){
        res.status(400).json(`ther is no user on data base`)
    }
    else{
        res.status(200).json({status:"sucess",data:user})
    }
})

const getSpecificProduct=asyncHandler(async(req,res)=>{
    const user=await productModel.findById(req.params.id)
    if(!user){
        res.status(400).json({message:`there is no product for this id ${req.params.id}`})
    }
    else{
        res.status(200).json({status:"sucess",data:user})

    }
})

const deleteProduct=asyncHandler(async(req,res)=>{
    const user =await productModel.findByIdAndDelete(req.params.id)
    if(!user){
        res.status(400).json({message:`there is no product for this id ${req.params.id}`})
    }
    else{
        res.status(200).json({message:`the product form this id${req.params.id} is deleted`})
    }
})



module.exports={
    createProduct,
    getProduct,
    getSpecificProduct,
    deleteProduct,
    uploadProductImage,
    resizeImage
}


