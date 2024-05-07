const appError=require("../utils/appError")
const productModel=require("../models/productModel")
const cartModel=require("../models/cartModel")
const asyncHandler=require("express-async-handler");
const calcTotalPrice=(cart)=>{
    let price=0;
    cart.cartItems.forEach((item)=>{
        price +=item.quantity*item.price;

    })

    cart.totalPrice=price;
    return price;

}


const addProductToCart=asyncHandler(async(req,res,next)=>{
     const {productId,color}=req.body
       const product=await productModel.findById(productId)
      
         let cart=await cartModel.findOne({user:req.currentUser._id})
         if(!cart){
              cart=await  cartModel.create({
                user:req.currentUser._id,
                 cartItems:[{product:productId,color:color,quantity:"1",price:product.price}]
              })
         }
         else{
            const productIndex=cart.cartItems.findIndex((item)=>item.product.toString()==productId)

            if(productIndex>-1){
                cart.cartItems[productIndex].quantity ++;
            }
            else{
                cart.cartItems.push({product:productId,color:color,price:product.price,quantity:"1"})
            }

         }

         calcTotalPrice(cart);
         cart.save();
         res.status(200).json({data:cart})


})

const getLoggedUserCart=asyncHandler(async(req,res,next)=>{
    const cart= await cartModel.findOne({user:req.currentUser._id})
    
    if(!cart){
        return next(new appError(`there is no cart for this id${req.currentUser._id}`))

    }
    res.status(200).json({status:"success",data:cart})

})


const deleteSpecificItem=asyncHandler(async(req,res)=>{

    const cart=await cartModel.findOneAndUpdate({user:req.currentUser._id},{
        $pull:{cartItems:{_id:req.params.id}}
    },{new:true})

    calcTotalPrice(cart);
    cart.save();
    res.status(200).json({status:"success",data:cart})


})


const clearCart=asyncHandler(async(req,res,next)=>{
    const cart =await cartModel.findOneAndDelete({user:req.currentUser._id},{new:true})
    res.status(200).json("cart is clean")
})

const updateCartItemQUantity=asyncHandler(async(req,res,next)=>{
    
    const cart =await cartModel.findOne({user:req.currentUser._id})
    if(!cart){
        return next(new appError(`there is no cart for this user ${req.currentUser._id}`))
    }
    const itemIndex= cart.cartItems.findIndex((item)=> item._id.toString()==req.params.id)
    if(itemIndex>-1){
        cart.cartItems[itemIndex].quantity=req.body.quantity
    }
    else{
        return next(new appError(`there is no items of this id ${req.params.id}`))
    }
        calcTotalPrice(cart);
        cart.save();
        res.status(200).json({status:"success",data:cart})


})



module.exports={
    addProductToCart,
    getLoggedUserCart,
    deleteSpecificItem,
    clearCart,
    updateCartItemQUantity
}

