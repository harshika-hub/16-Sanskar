import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { otpGen } from "otp-gen-agent";
import dotenv from "dotenv";
import { productmodels } from "../model/vendorModal.js";
import UserRegistration from "../model/indexModal.js";
import { send } from '../model/mail.model.js'
import { userReview } from "../model/userModel.js";


const SECRET_KEY = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
dotenv.config();
const maxAge = (8 * 24 * 60 * 60);

export default jwt;
let payload = {};
let token;

const uProductController = (req, res) => {

    productmodels.find({})

        .then((data, err) => {
            if (err) {
                console.log(err + "error occures..............");
            }
            res.render('pages/userProduct', { item: data })
        })

    // res.render('pages/userProduct');
}
export { uProductController }

const ucartController = (req, res) => {
    res.render('pages/cart');
    console.log(req.cookies)
}
export { ucartController }

// const uprofileController = (req, res) => {
//     res.render('pages/user_profile');
// }
// export { uprofileController }
const uprofileController= async (req,res)=>{
    
    try {
        var email = req.cookies.customer.email
        console.log(email);
        const result = await UserRegistration.findOne({ email: req.cookies.customer.email });
        //  console.log(result);
        res.render('pages/user_profile', { data: result })

    }
    catch (error) {
        console.log(error)

    }

}
export {uprofileController}

const edituserprofile = async (req, res) => {
    try {
        const email = req.query.email;
        //    console.log("url email"+email);
        const userData = await UserRegistration.findOne({ email: email });
        if (userData) {
            res.render('pages/user_update', { userData: userData })
        }
        else {
            res.redirect('pages/user_profile', { data: "" });
        }
    }
    catch (error) {
        console.log(error)

    }
}
export { edituserprofile }

const updateuserprofile = async (req, res) => {
    try {
        // console.log(req.body)
        const userUpdateData =await UserRegistration.findByIdAndUpdate({ _id: req.body.customer_id }, { $set: { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email,contact: req.body.contact,category: req.body.category,street: req.body.street, city: req.body.city, state: req.body.state,zipcode:req.body.zipcode } })
        // console.log("DATA : "+vendorUpdateData);
        const UserData = await UserRegistration.findOne({ email: req.body.email });
        //  console.log(vendorData);
        //  res.redirect('vendor_profile')
        res.render('pages/user_profile', { data: UserData});
    }
    catch (error) {
        console.log(error)
    }
}
export { updateuserprofile }

const userCancelController = (req, res)=>{
    
    res.redirect('/userProduct');
}
export {userCancelController};


// const uloginController=(req,res)=>{
//     res.render('pages/user_login');
// }

// export {uloginController}




var votp='';

const userRegistrationController = async (req, res, next) => {

    try {
        console.log("-------registration------");
        const { firstname, lastname, email, password, confirmpassword, contact, street, city, state, zipcode, otp } = req.body
        
            const existingUser = await UserRegistration.findOne({ email: email });
            if (existingUser) {
                return res.status(400).json({ message: "user already exists" });
            }
            if (!otp) {
                votp = await otpGen(); // '344156'  (OTP length is 6 digit by default)
                console.log(otp);
               const mdata = {
                   "from": "harshika.p3.hp@gmail.com",
                   "to": email,
                   "subject": " Otp for verification",
                   "text": `Your otp for registering on 16-Sanskar is:${votp}`,
               }
               const r=await send(mdata);
               console.log("sended :- "+r)
   
   
           } else {
            if(!votp==otp)
            return  res.render('pages/Registration',{msg:" please Enter valid otp"});

   
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = new UserRegistration({
                role:"customer",
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedPassword,
                confirmpassword: confirmpassword,
                contact: contact,
                street: street,
                city: city,
                state: state,
                zipcode: zipcode

            })
            await result.save()
            console.log(result);
            payload.result = result;
            const expireTime = {
                expiresIn: '1d'
            }
            console.log("Data inserted Successfully");
            token = jwt.sign(payload, SECRET_KEY, expireTime);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
            if (!token) {
                res.json({ message: "Error occured with token" })
            } else {
                console.log(token);
                const customer = {
                    email:email,
                    // password:hashedPassword,
                    role:"customer"
                }
                res.cookie("customer",customer);

                res.redirect("userRegistrationToken");
            }
        }
    } catch (error) {
        console.log("Error" + error);
    }

}
export { userRegistrationController }

const userLoginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        console.log("check");
        const existingUser = await UserRegistration.findOne({ email: email });
        payload.result = existingUser;
        const expireTime = {
            expiresIn: '1d'
        }
        if (!existingUser) {
            // return res.status(400).json({message:"user not registered yet ,please registered here "});
            res.render('pages/user_login', { msg: "user not registered yet ,please registered here " });
        } else {
            const matchPassword = await bcrypt.compare(password, existingUser.password);
            if (!matchPassword) {
                return res.render('pages/user_login', { msg: "Password Not matched.....Please Enter correct Password " });
            } else {
                token = jwt.sign(payload, SECRET_KEY, expireTime);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                if (!token) {
                    res.json({ message: "Error occured with token" })
                } else{
                    const customer = {
                        email:email,
                        role:"customer"
                    }
                    res.cookie("customer",customer);
                    res.redirect("userToken");

                }

            }
        }
    } catch (error) {
        console.log("Error" + error);
    }
}
export { userLoginController }

export const authenticateJWT = (request, response, next) => {
    console.log("authenticateJWT : ");
    const token = request.cookies.jwt;
    if (!token) {
        response.json({ message: "Error Occured while dealing with Token inside authenticateJWT" });
    }
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err)
            res.render('pages/user_login', { msg: "Token is not valid " });
        request.payload = payload;
        next();
    });
}

export const authorizeUser = (request, response, next) => {
    console.log("5", request.payload.result.email);
    next();
}
export { jwt, SECRET_KEY }

export const ureviewController =(request,response)=>{
    var email = request.cookies.customer.email
    console.log(email);        
}
export const ureviewProductController = async (request,response)=>{
   console.log("==================")
   try {
       const {productId,review} = request.body;
       console.log(request.body);
       const email = request.cookies.customer.email;
       console.log(email)
       const result = new userReview({
           productId:productId,
           email:email,
           review:review
       })
       const items=await productmodels.find()
       console.log(result);
       await result.save();
       console.log("Data inserted Successfully");
       response.render("pages/userproduct",{item:items});
   } catch (error) {
       console.log("Error"+error);
   }
}
export const ucomboController= async(req,res)=>{
    try{
        const data=await productmodels.find({$and:[{vproduct_type:'combo'},{vproduct_status:'Activated'}]});
        res.render('pages/userProduct',{item:data});

    }catch(err){
        console.log("Error while fetching combo "+err );
    }

}

export const usanskarController=async(req,res)=>{
    try{
        var sanskar=req.params.sanskar;
        var data=await productmodels.find({sanskar:sanskar});
        res.render('pages/userProduct',{item:data});

    }catch(err){
        console.log("Error while fetching specific sanskars products"+err);

    }
    

}



