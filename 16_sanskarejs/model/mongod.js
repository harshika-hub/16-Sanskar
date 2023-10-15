import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/16_sanskar').then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("error occured "+err);
});