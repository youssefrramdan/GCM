const { timeStamp } = require("console");
const mongoose=require("mongoose");
const { type } = require("os");
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:["true","password is required"]
    },
    street:String,
    apartment:String,
    city:String,
    phone:Number,
    Image:{
        type:String,
        
    },
    role:{
        type:String,
        default:"user"
    },

    passwordChangedAt:{
        type:Date,
    }

    

},{timeStamp:true})

userSchema.pre("save",async function(next){


    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,12)
    next();
   
  

})
const userModel=mongoose.model("user",userSchema)

module.exports =userModel