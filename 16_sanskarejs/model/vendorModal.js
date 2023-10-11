import mongoose from "mongoose";



// Defining Schema
const registration = new mongoose.Schema({

    role:{type:String,required:true,trim:true},
    name:{type:String,required:true,trim:true},
    email:{type:String,unique:true,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    confirmpassword:{type:String,required:true,trim:true},
    contact:{type:Number,minlength:10,required:true,trim:true},
    street:{type:String,required:true,trim:true},
    city:{type:String,required:true,trim:true},
    pin_code:{type:Number,minlength:10,required:true,trim:true},
    state:{type:String,required:true,trim:true},
    gst_number:{type:String,minlength:15,required:true,trim:true},
    aadhar_number:{type:Number,minlength:12,required:true,trim:true},
    category:{type:String,required:true,trim:true},

});
const Registration = mongoose.model("registration",registration);

export { Registration};




let productSchemas = new mongoose.Schema({
    vproduct_id: {type:Number,
        unique:true},
    vproduct_name: String,
    vproduct_price: Number,
    vproduct_perqty: String,
    vproduct_brandnamae: String,
    vproduct_category: String,
    vproduct_mfd: Date,
    vproduct_expirydate: Date,
    vproduct_description: String,
    vproduct_totalqty: String,
    vproduct_imag:{type:String,require:true},
    user_id: Number,
    vendor_categoryid: Number,

});
export let productmodels = new mongoose.model('vendorproducts', productSchemas);