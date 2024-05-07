const express =require("express")
const router=express.Router();
const{signUp,login}=require("../service/authService");

router.route("/signup").post(signUp)
router.route("/login").get(login)

module.exports=router
