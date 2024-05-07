const mongoose =require("mongoose")

const dbConnection=()=>{
    mongoose.connect(process.env.DB_CONNECTION).then(()=>{
        console.log("connet")
    }).catch((err)=>{
        console.log("cannt be connect to database")
    })

}
module.exports =dbConnection;