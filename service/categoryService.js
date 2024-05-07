const categoryModel=require("../models/categoryModel");
const asyncHandler =require("express-async-handler");

const uploadSingleImage =require("../middelware/uploadImage")
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');




const uploadCatogoryImage=uploadSingleImage("image")



const resizeImage=asyncHandler(async(req,res,next)=>{
    if(req.file){
    const fileName= `category-${uuidv4()}-${Date.now()}-.jpeg`
    sharp(req.file.buffer).resize(600,600)
    .toFormat("jpeg")
    .jpeg({quality:90})
    .toFile(`uploads/category/${fileName}`)
    req.body.image=fileName
    }
    next();
})

const createCategory=asyncHandler(async(req,res)=>{
    const category=await categoryModel.create(req.body);
    if(!category){
        res.json("failed")
    }
    else{
        res.status(200).json({status:"success",data:category})
    }
})

const getAllCategory=asyncHandler(async(req,res)=>{
    const category=await categoryModel.find();
    if(!category){
        res.status(500).json({status:"failed",message:"there is no data "})
    }
    else{
        res.status(200).json({status:"success",data:category})
    }
})


const getSpecificCategory=asyncHandler(async(req,res)=>{
    const category =await categoryModel.findById(req.params.id)
    if(!category){
        res.status(500).json({status:"faied",message:`there is no category for this id ${req.params.id}`})
    }
    else{
        res.status(200).json({status:"failed",data:category})
    }
})

const deleteCategory=asyncHandler(async(req,res)=>{
    const category =await categoryModel.findByIdAndDelete(req.params.id)
    if(!category){
        res.status(400).json({status:"failed",message:`cant find category for this id${req.params.id}`})
    }
    else{
        res.status(200).json({status:"success",message:`this category for this id is deleted ${req.params.id}`})
    }
})

module.exports={
    uploadCatogoryImage,
    resizeImage,
    createCategory,
    getAllCategory,
    getSpecificCategory,
    deleteCategory
}
