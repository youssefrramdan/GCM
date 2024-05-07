const { ObjectId, Timestamp } = require("bson");
const mongoose =require("mongoose");
const { type } = require("os");

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:["true","image is required"]
    },
    Images:[String],
    brand:String,
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"category",
        required:true
    },
    countinstock:Number,
    rating:Number,
    datacreated:Date,
    wholesalePrice:Number
    



},{Timestamp:true})

const productModel=mongoose.model("product",productSchema)
module.exports =productModel;