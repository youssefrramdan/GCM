const express =require("express");
const {createUser, getUser, getSpecificUser,deletUser, uploadUserImage,resizeImage} =require("../service/userService")
const router=express.Router();



router.route("/").post(uploadUserImage,resizeImage,createUser).get(getUser)
router.route("/:id").get(getSpecificUser).delete(deletUser)


module.exports =router
