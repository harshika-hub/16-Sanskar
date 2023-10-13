import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import crypto from 'crypto';

import { Registration,productmodels } from '../model/vendorModal.js';
import UserRegistration from "../model/indexModal.js";

 dotenv.config();
// const secret_key = process.env.JWT_SECRET
const secret_key=process.env.JWT_SECRET||crypto.randomBytes(32).toString('hex');


export const aloginController = (req, res) => {
    res.render('pages/admin_login', { msg: "" });
}



export const avalidateController = async (req, res,) => {
   
    const tokens = req.cookies.jw;
    
    if(tokens)
    {
        res.redirect('adminToken');
    }else{

    const { email, password } = req.body;
    await Registration.findOne({ role: "admin" })
        .then(async (data, err) => {
            if (err) {
                console.log("Error while fetching admin details");
            } else if (data == null) {
                res.render("pages/admin_login", { msg: "Admin Details are not available in database" });
            } else {
                console.log(data)
                if (data.email == email && (await bcrypt.compare(password, data.password))) {
                    const payloads = {
                        email: data.email,
                        password: data.password,
                        role: data.role
                    }
                    const expiry= { expiresIn: "1h" }
                    const token = jwt.sign(payloads,
                        secret_key,
                        expiry
                    );
                    res.cookie('jw', token, { httpOnly: true });
                    res.cookie("adminLogin",payloads);
                    // data.token = token;
                    if (!token)
                        console.log("token is not genrated");
                    else
                    res.redirect('adminToken');
                        // next();
                } else {
                    res.render("pages/admin_login", { msg: "Please insert valid details" });

                }
            }
        });
    }
    
}

export const authenticate = (async(req, res, next) => {
    // const token=req.body.token||req.query.token||req.headers["x-access-token"];
    const token = req.cookies.jw;
    console.log(token);
    console.log("Secret*** "  +secret_key);
    if (!token) {
        return res.render('pages/admin_login', { msg: "Token is required" });
    }
    const decoded =  jwt.verify(token, secret_key,(err,payloads) => {
        if (err) {
            console.log("tokens* "+err)
            return res.render('pages/admin_login', { msg: "Invalid Token" });
        }else{
        // req.user = decoded;
        req.payloads = payloads;
        console.log("login successfully");
        next();
        }
    });


});

const adashController = async(req, res) => {
    await Registration.find({role:"vendor"})

    .then( async(data, err)=> {
        if(err){
            console.log(err+"error occures while fetching vendor..............");
        }else{

            await Registration.find({role:"customer"})
            .then((data1, err)=> {
            if(err){
            console.log(err+"error occures while fetching customer..............");
            }else{
            console.log(data.length);
            res.render('pages/admin_dash',{vendor:data.length,customer:data1.length});
        }
       
    });
          
        }
       
    });



    // res.render('pages/admin_dash');
}
export { adashController }

const auserController= async (req,res)=>{
    try{
        const result =await UserRegistration.find({
            role:"customer"
        });
        console.log(result);
        res.render('pages/user_details',{userrecord:result,message:""});
   }catch(error){
         console.log("Error Occured"+error);
   }
}
export { auserController }

const avendorController = (req, res) => {
    res.render('pages/vendor_details');
}
export { avendorController }

const aproductController = (req, res) => {
    res.render('pages/added_product');
}
export { aproductController }

const aorderController = (req, res) => {
    res.render('pages/Orders');
}
export { aorderController }



const aDeactivateUserController = async (req, res) => {
    const userEmail = req.params.email;
  
    try {
        // Find the user by email and update their status to "deactivated"
        const updatedUser = await UserRegistration.findOneAndUpdate(
            { email: userEmail },
            { status: 'deactivated' },
            { new: true } // Return the updated user
        );
        const result =await UserRegistration.find({
            role:"customer",
            status: 'active'
        });
        console.log(result);
        res.render('pages/user_details',{userrecord:result,message:""});
  
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        
        // res.render('pages/user_details',{userrecord:""}); 
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deactivating the user.');
    }
  }
  export {aDeactivateUserController}
