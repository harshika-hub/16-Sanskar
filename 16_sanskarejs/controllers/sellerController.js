import '../model/mongod.js';
import fs from 'fs';
import path from 'path';
import { upload } from '../routes/sellerRoute.js'
import { productmodels, Registration } from '../model/vendorModal.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
const SECRET_KEY =process.env.JWT_SECRET||crypto.randomBytes(32).toString('hex'); 
dotenv.config();
const maxAge =3*24*60*60;
export default jwt;
let payload={};
let token;


const vregController = (req, res) => {
    res.render('pages/vendor_registration');
}
export { vregController }


const vproductController = (req, res) => {

    productmodels.find({vproduct_status:"Activated"})

        .then((data, err) => {
            if (err) {
                console.log(err + "error occures..............");
            }
            res.render('pages/vendor_product', { item: data, edit: '' })
        });

}
export { vproductController }

const vprofileController = (req, res) => {
    res.render('pages/Vendor_profile');
}
export { vprofileController }


const vendorcreate = async (req,res,next)=>{
    try
    {
        const {name,email,password,confirmpassword,contact,street,city,pin_code,state,gst_number,aadhar_number,category} = req.body
        const existingvendore = await Registration.findOne({email:email});
        if(existingvendore){
            return res.status(400).json({message:"user already exists"});
         }
         const hashedPassword = await bcrypt.hash(password,10);
         const result= new Registration({
            name:name,
            email:email,
            password:hashedPassword,
            confirmpassword:confirmpassword,
            contact:contact,
            street:street,
            city:city,
            pin_code:pin_code,
            state:state,
            gst_number:gst_number,
            aadhar_number:aadhar_number,
            category:category
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
           res.redirect("vendorRegistrationToken");
        }
    }
    catch (error) {
        console.log("Error"+error);
      }  
    }
    export{vendorcreate}
   
    const vendoreloginController=async (req,res)=>{
       try {
           const {email,password}=req.body;
         const existingUser = await Registration.findOne({email:email});
         payload.result=existingUser;
         const expireTime ={
             expiresIn: '1d'
         }
         if(!existingUser){
            res.render("pages/vendor_login",{msg:"user not found"});
           // return res.status(400).json({message:"user already exists"});
        }else{
        const matchPassword = await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            res.render("pages/vendor_login",{msg:"password not match"});
           // return res.status(400).json({message:"Invalid Credentials"});
        }else{
           token = jwt.sign(payload,SECRET_KEY,expireTime);
           res.cookie('jwt',token,{httpOnly: true,maxAge:maxAge});
           if(!token){
              res.json({message:"Error occured with token"})
           }else 
            res.redirect("vendorToken");
        }
       }
       }catch(error){
           console.log("Error "+error);
        }
       
       }
   export{vendoreloginController}
   
   export const authenticateJWT = (request, response, next) => {
       console.log("authenticateJWT : ");
       const token = request.cookies.jwt;
       if (!token) {
           response.json({ message: "Error Occured while dealing with Token inside authenticateJWT" });
       }
       jwt.verify(token, SECRET_KEY, (err, payload) => {
           if (err)
               response.json({ message: "Error Occured while dealing with Token during verify" });
           request.payload = payload;
           // response.render('pages/userProduct',{item:item});
           next();
       });
   }
   
   export const authorizeUser = (request, response, next) => {
       console.log("5", request.payload.result.email);
        next();
   }
   export{jwt,SECRET_KEY}
   


export const vAddproductController = async (req, res) => {
    var { productId, productName, productPrice, productPerqty, productTotalqty, productBrandname, productCategory, productMfd, productExpirydate, productDescription } = req.body;
    console.log(req.body);

    //  productmodels.find({vproduct_status:"Activated"})

    // .then((data, err)=>{
    //     if(err){
    //         console.log(err+"error occures..............");
    //     }
    //     res.render('pages/vendor_product',{item: data,edit:''})
    // })
    console.log(req.file.filename + " file");
    try {
        const product = await productmodels.create({
            vproduct_id: productId,
            vproduct_name: productName,
            vproduct_price: productPrice,
            vproduct_perqty: productPerqty,
            vproduct_totalqty: productTotalqty,
            vproduct_brandnamae: productBrandname,
            vproduct_category: productCategory,
            vproduct_mfd: productMfd,
            vproduct_expirydate: productExpirydate,
            vproduct_description: productDescription,
            vproduct_imag: req.file.filename,
            user_id: 1,
            vendor_categoryid: 100

        });
        await product.save();
        console.log("product added successfully....");

        productmodels.find({vproduct_status:"Activated"})

            .then((data, err) => {
                if (err) {
                    console.log(err + "error occures..............");
                }
                res.render('pages/vendor_product', { item: data, edit: '' })
            })
    } catch (err) {
        console.log("Error while inserting " + err)

    }

}
//Edit details;
export const vEditproductController = (req, res) => {
    var vproduct_id = req.params.vproduct_id;
    productmodels.find({ vproduct_id: vproduct_id }).then((datas, err) => {
        if (err) {
            console.log("Error " + err);
        }
        else {

            productmodels.find({vproduct_status:"Activated"})

                .then((data, errs) => {
                    if (errs) {
                        console.log(errs + "error occures..............");
                    }
                    res.render('pages/vendor_product', { item: data, edit: datas[0] });
                })
        }
    });
}

export const vUpdatproductController = async (req, res) => {
    console.log(req.body)


    try {
        var productImg = req.file.filename;

        var { productId, productName, productPrice, productDescription } = req.body;
        if (!productImg)
            productImg = req.params.vproduct_img;


        const result = await productmodels.findByIdAndUpdate(req.params.id, {
            vproduct_name: productName,
            vproduct_price: productPrice,
            vproduct_description: productDescription,
            vproduct_imag: productImg
        });
    } catch (err) {
        console.log("error while updating " + err);
    }

    productmodels.find({vproduct_status:"Activated"})

        .then((data, errs) => {
            if (errs) {
                console.log(errs + "error occures..............");
            }
            res.render('pages/vendor_product', { item: data, edit: "" });
        })


    //    res.redirect('pages/vendor_product')
    //    res.render('pages/vendor_product',{item: data,edit:datas[0]});

}

export const vDeleteproductController = async (req,res) => {
    console.log(req.params.id)
    try {
        const result = await productmodels.findOneAndUpdate({_id: req.params.id}, {
            vproduct_status:"Deactivated",
        },{new:true});
        console.log(result);
    } catch (err) {
        console.log("error while deactivating product" + err);
    }

    productmodels.find({vproduct_status:"Activated"})

        .then((data, errs) => {
            if (errs) {
                console.log(errs + "error occures..............");
            }
            res.render('pages/vendor_product', { item: data, edit: "" });
        })


    //    res.redirect('pages/vendor_product')
    //    res.render('pages/vendor_product',{item: data,edit:datas[0]});

}