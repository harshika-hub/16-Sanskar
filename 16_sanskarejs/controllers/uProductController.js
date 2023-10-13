import UserRegistration from "../model/indexModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { productmodels } from "../model/vendorModal.js";
import crypto from "crypto";
import dotenv from "dotenv";
const SECRET_KEY =process.env.JWT_SECRET||crypto.randomBytes(32).toString('hex'); 
dotenv.config();
const maxAge =3*24*60*60;

export default jwt;
let payload={};
let token;

const uProductController = (req, res) => {
    
    productmodels.find({})

    .then((data, err)=>{
        if(err){
            console.log(err+"error occures..............");
        }
        res.render('pages/userProduct',{item: data})
    })

    // res.render('pages/userProduct');
}
export { uProductController }

const ucartController = (req, res) => {
    res.render('pages/cart');
    console.log(req.cookies)
}
export { ucartController }

const uprofileController=(req,res)=>{
    res.render('pages/user_profile');
}
export {uprofileController}

// const uloginController=(req,res)=>{
//     res.render('pages/user_login');
// }

// export {uloginController}




const userRegistrationController= async (req,res,next)=>{
    try {
        console.log("-------registration------");
        const {firstname,lastname,email,password,confirmpassword,contact,street,city,state,zipcode} = req.body
        const existingUser = await UserRegistration.findOne({email:email});
        if(existingUser){
           return res.status(400).json({message:"user already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10); 
        const result= new UserRegistration({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hashedPassword,
            confirmpassword:confirmpassword,
            contact:contact,
            street:street,
            city:city,
            state:state,
            zipcode:zipcode

        })
        await result.save()
        console.log(result);
        payload.result=result;
        const expireTime ={
             expiresIn:'1d'
        }
         console.log("Data inserted Successfully");
         token = jwt.sign(payload,SECRET_KEY,expireTime);
         res.cookie('jwt',token,{httpOnly: true,maxAge:maxAge});
         if(!token){
            res.json({message:"Error occured with token"})
         }else{
            console.log(token);
            res.redirect("userRegistrationToken");
         }
        
      } catch (error) {
        console.log("Error"+error);
      }
}
export{userRegistrationController}

const userLoginController = async(req,res,next)=>{
    const {email,password} =req.body;
    try {
      console.log("check");
      const existingUser = await UserRegistration.findOne({email:email});
      payload.result=existingUser;
      const expireTime ={
          expiresIn: '1d'
      }
      if(!existingUser){
        // return res.status(400).json({message:"user not registered yet ,please registered here "});
        res.render('pages/user_login',{msg:"user not registered yet ,please registered here "});
     }else{
     const matchPassword = await bcrypt.compare(password,existingUser.password);
     if(!matchPassword){
        return         res.render('pages/user_login',{msg:"Password Not matched.....Please Enter correct Password "});
    }else{
        token = jwt.sign(payload,SECRET_KEY,expireTime);
        res.cookie('jwt',token,{httpOnly: true,maxAge:maxAge});
        if(!token){
           res.json({message:"Error occured with token"})
        }else 
         res.redirect("userToken");

     }
    }
    }catch (error) {
      console.log("Error"+error);
    }
}
export{userLoginController}     

export const authenticateJWT = (request, response, next) => {
    console.log("authenticateJWT : ");
    const token = request.cookies.jwt;
    if (!token) {
        response.json({ message: "Error Occured while dealing with Token inside authenticateJWT" });
    }
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err)
        res.render('pages/user_login',{msg:"Token is not valid "});
        request.payload = payload;
        next();
    });
}

export const authorizeUser = (request, response, next) => {
    console.log("5", request.payload.result.email);
     next();
}
export{jwt,SECRET_KEY}






