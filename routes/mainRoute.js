const userRoute=require("./userRoute")
const productRoute=require("./productRoute")
const authRoute=require("./authRoute")
const categoryRoute=require("./categoryRoute")
 const cartRoute=require("./cartRoute")

const mainRoute=(app)=>{
    app.use("/user",userRoute)
    app.use("/product",productRoute)
    app.use("/auth",authRoute)
    app.use("/category",categoryRoute)
    app.use("/cart",cartRoute)
}

module.exports =mainRoute;