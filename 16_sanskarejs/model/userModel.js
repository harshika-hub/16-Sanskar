import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    productId: {type:Number},
    email:{type:String},
    review :{type:String}
});
export const userReview = mongoose.model("review",reviewSchema);
// export default userReview