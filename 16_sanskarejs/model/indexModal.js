import mongoose from "mongoose";

// Defining Schema
const UserregistrationSchema = new mongoose.Schema({
    role:{type:String},
    firstname:{type:String,required:true,trim:true},
    lastname:{type:String,required:true,trim:true},
    email:{type:String,unique:true,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    confirmpassword:{type:String,required:true,trim:true},
    contact:{type:Number,minlength:10,required:true,trim:true},
    street:{type:String,required:true,trim:true},
    city:{type:String,required:true,trim:true},
    state:{type:String,required:true,trim:true},
    zipcode:{type:Number,minlength:6,required:true,trim:true},
    status:{type:String,default:"active"},
    token:{type:String,default:""},
});
const UserRegistration = mongoose.model("registrations",UserregistrationSchema);

export default UserRegistration;