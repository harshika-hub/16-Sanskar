import mongoose from "mongoose";



// Defining Schema
const registration = new mongoose.Schema({

    role:{type:String,trim:true},
    name:{type:String,trim:true},
    email:{type:String,unique:true,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    confirmpassword:{type:String,trim:true},
    contact:{type:Number,minlength:10,trim:true},
    street:{type:String,trim:true},
    city:{type:String,trim:true},
    pin_code:{type:Number,minlength:10,trim:true},
    state:{type:String,trim:true},
    gst_type:String,
    gst_number:{type:String,minlength:6,maxlength:15,trim:true},
    aadhar_number:{type:Number,minlength:12,trim:true},
    category:{type:String,trim:true},
    token:{type:String,default:""},

});
const Registration = mongoose.model("registration",registration);

export { Registration};




let productSchemas = new mongoose.Schema({
    // vproduct_id: {type:Number,
    //     unique:true},
    vproduct_name: String,
    vproduct_price: Number,
    vproduct_perqty: String,
    vproduct_brandnamae: String,
    vproduct_category: String,
    vproduct_mfd: Date,
    vproduct_expirydate: Date,
    vproduct_description: String,
    vproduct_totalqty: String,
    vproduct_margin:Number,
    vproduct_imag:{type:String,require:true},
    user_id: Object,
    vendor_categoryid: Number,
    vproduct_status:{
        type:String,
        default:"Activated"
    },
    vproduct_type:String,
    sanskar:String,
    vproduct_show:
    {type: String,default:" "},

});
export const productmodels = new mongoose.model('vendorproducts', productSchemas);