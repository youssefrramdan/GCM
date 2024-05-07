const express=require("express")
const router=express.Router();
const{uploadCatogoryImage, resizeImage,createCategory,getAllCategory,getSpecificCategory, deleteCategory}=require("../service/categoryService");


router.route("/").post(uploadCatogoryImage,resizeImage,createCategory).get(getAllCategory)
router.route("/:id").get(getSpecificCategory).delete(deleteCategory)

module.exports=router