const multer=require("multer");
const appError = require("../utils/appError");


const multerOptions=()=>{
    const multerStorage=multer.memoryStorage();
    const multerFilter=(req,file,cb)=>{

        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }
        else{
            cb(new appError("only image allowed",400),false)
        }
    }
    const upload=multer({storage:multerStorage,fileFilter:multerFilter})
    return upload;

}


const uploadSingleImage=(fileName)=>{
    
    return multerOptions().single(`${fileName}`)

}



module.exports=uploadSingleImage;
