const mongoose =require("mongoose");
const categorySchema= mongoose.Schema({
    name:{
        type:String,
        required:["ture","name is required"]
    },
    color:{
       type: String
    },
    icon:{
            type:String
    },
    image:{
        type:String
    }


    

},{Timestamp:true})
const categoryModel=mongoose.model("category",categorySchema)
module.exports=categoryModel
