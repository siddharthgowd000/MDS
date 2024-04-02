const { json } = require("express")
const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/Logindata")
.then(()=>{
    console.log("Mongo connected")
})
.catch(()=>{
    console.log("Not Connected")
})

const LogInSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String, 
        require:true
    },
    password:{
        type:String,
        require:true
    },
    imagename:{
        type:Array
    },
    imagepath:{
        type:Array
    }
})

const collection=new mongoose.model("logincollection",LogInSchema)
module.exports=collection