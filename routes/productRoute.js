const express =require("express");
const router=express.Router();
const {createProduct,getProduct,getSpecificProduct,deleteProduct,  uploadProductImage,resizeImage}=require("../service/productService");
const {protect}=require("../service/authService")
const { route } = require("./userRoute");
const productModel = require("../models/productModel");

router.route("/").post(uploadProductImage,resizeImage,createProduct).get(protect,getProduct)
router.route("/:id").get(getSpecificProduct).delete(deleteProduct)


//get a product details with his category details
router.route(`/catdetails/:id`).get( async (req, res) =>{
    const product = await productModel.findById(req.params.id).populate('category');

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product);
})


//get LAST 6 FEATURED products which are displayed on the HOME page
router.route(`/get/featured`).get(async (req, res) =>{
    const count=6;
    const products = await Product.find( {isFeatured: true}).limit(count) ;

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})


//get products in a spacific category  
router.route(`/filter`).get(async (req, res) =>{
    let filter = {};
    if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')}
    }

    const productList = await productModel.find(filter).populate('category');

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})















module.exports=router
