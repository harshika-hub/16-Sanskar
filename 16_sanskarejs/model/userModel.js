import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    productId: {type:Number},
    email:{type:String},
    review :{type:String},
   
});
export const userReview = mongoose.model("review",reviewSchema);
// export default userReview
const userCartSchema = new mongoose.Schema({
  
    vendor_id:Object,
    customer_id:String,
    product_name:String,
    product_id: String,
    product_quantity:Number,
    product_price:Number,
    product_orderdate:Date,
    product_deleverydate:Date,
    product_image:String,
    per_product_quntity:String,
    total_product:{type:Number,default:1},
    product_brand:String,
    status:String,
    order:{type:String,default:'No'},
});
const UserCart = mongoose.model("userCartSchema",userCartSchema);
export { UserCart};