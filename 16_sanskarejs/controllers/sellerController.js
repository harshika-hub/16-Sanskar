import '../model/mongod.js';
import fs from 'fs';
import path from 'path';
import { otpGen } from "otp-gen-agent";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import Randomstring from 'randomstring';
import { upload } from '../routes/sellerRoute.js'
import { send } from '../model/mail.model.js'
import { productmodels, Registration } from '../model/vendorModal.js';
import { NONAME } from 'dns';
const SECRET_KEY = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
dotenv.config();
const maxAge = (5* 24 * 60 * 60 * 1000); //take time in ms
export default jwt;
let payload = {};
let token;

const vregController = (req, res) => {
    res.render('pages/vendor_registration', { msg: "" });
}
export { vregController }


const vproductController = async (req, res) => {
    var uid = await Registration.aggregate([
        {
            $match: { email: req.cookies.vendor.email }
        },
        {
            $project: {
                _id: 1
            }
        }
    ]);
    console.log("vendorId " + uid)

    // await productmodels.find({ $and: [{ vproduct_status: "Activated" }, { user_id: uid[0]._id }] })
    await productmodels.find({   user_id: uid[0]._id  })

        .then((data, err) => {
            if (err) {
                console.log(err + "error occures..............");
            } else {
                // console.log("vproduct " + data)
                res.render('pages/vendor_product', { item: data, edit: '' })
            }
        });

}
export { vproductController }

const vprofileController = (req, res) => {
    res.render('pages/Vendor_profile');
}
export { vprofileController }
var votp = '';

const vendorcreate = async (req, res, next) => {
    try {
        var lg='';
        var gst_type=''
        const { name, email, password, confirmpassword, contact, street, city, pin_code, state,gst_select, gst_number,license_number, aadhar_number, category, otp } = req.body
        if(gst_select=='GST')
        {
            gst_type='GST';
            lg=gst_number;
        }else if(gst_select=='license_number'){
            gst_type='license Number';
            lg=license_number
            console.log(lg);
        }else{
            gst_type='none';
            lg='later';
        }

        const existingvendore = await Registration.findOne({ email: email });
        if (existingvendore) {
            return res.render('pages/vendor_registration', { msg: "user already exist" });
        }
        if (!otp) {
            votp = await otpGen(); // '344156'  (OTP length is 6 digit by default)
            console.log(votp);
            const mdata = {
                "from": "harshika.p3.hp@gmail.com",
                "to": email,
                "subject": " Otp for Seller verification",
                "text": `Your otp for registering on 16-Sanskar is:${votp}`,
            }
            const r = await send(mdata);
            console.log("sended :- " + r)


        } else {
            if (!votp == otp)
                return res.render('pages/vendor_registration', { msg: " please Enter valid otp" });


            const hashedPassword = await bcrypt.hash(password, 10);
            const result = new Registration({
                role: 'vendor',
                name: name,
                email: email,
                password: hashedPassword,
                confirmpassword: confirmpassword,
                contact: contact,
                street: street,
                city: city,
                pin_code: pin_code,
                state: state,
                gst_type:gst_type,
                gst_number: lg,
                aadhar_number: aadhar_number,
                category: category
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
                const vdata = {
                    email: email,
                    role: result.role,
                }
                res.cookie('vendor', vdata);
                res.redirect("vendorRegistrationToken");
            }
        }
    }
    catch (error) {
        console.log("Error" + error);
    }
}
export { vendorcreate }

const vendoreloginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await Registration.findOne({ email: email });
        payload.result = existingUser;
        console.log(existingUser);
        const expireTime = {
            expiresIn: '1d'
        }
        if (!existingUser) {
            res.render("pages/vendor_login", { msg: "user not found" });
        } else {
            const matchPassword = await bcrypt.compare(password, existingUser.password);
            if (!matchPassword) {
                res.render("pages/vendor_login", { msg: "password not match" });
            } else {
                token = jwt.sign(payload, SECRET_KEY, expireTime);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                if (!token) {
                    res.json({ message: "Error occured with token" })
                } else {
                    const vdata = {
                        email: email,
                        role: existingUser.role,
                    }
                    res.cookie('vendor', vdata,{maxAge:maxAge});

                    res.redirect("vendorToken");
                }
            }
        }
    } catch (error) {
        console.log("Error " + error);
    }

}
export { vendoreloginController }

export const authenticateJWT = (request, response, next) => {
    console.log("authenticateJWT : ");
    const token = request.cookies.jwt;
    // console.log(token.payload.result+" in authenticate");
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
export { jwt, SECRET_KEY }



export const vAddproductController = async (req, res, next) => {
    var vid = '';
    var type=''
    console.log("vendor cookie" + req.cookies.vendor.email);
    var { productId, productName, productPrice, productPerqty,qty_unit, productTotalqty,qty_units, productBrandname, productCategory, productMfd, productExpirydate, productDescription,sanskar } = req.body;
    productPerqty+=' '+qty_unit;
    productTotalqty+=' '+qty_units;
    console.log("value in add  ");
    console.log(req.body);
    if(sanskar=='select')
    {
        type='single';
        sanskar='any';
    }else{
        type='combo';
    }
    await Registration.findOne({ email: req.cookies.vendor.email }).then((data) => {
        console.log('vendor details in add product ' + data._id);
        vid = data._id;
    }).catch((err) => {
        console.log("error while fetching online vendor " + err)
    })


    
    console.log(req.file.filename + " file");
    try {
        const product = await productmodels.create({
            // vproduct_id: productId,
            vproduct_name: productName,
            vproduct_price: productPrice,
            vproduct_perqty: productPerqty,
            vproduct_totalqty: productTotalqty,
            vproduct_margin:25,
            vproduct_brandnamae: productBrandname,
            vproduct_category: productCategory,
            vproduct_mfd: productMfd,
            vproduct_expirydate: productExpirydate,
            vproduct_description: productDescription,
            vproduct_imag: req.file.filename,
            user_id: vid,
            vendor_categoryid: 100,
            vproduct_type:type,
            sanskar:sanskar,

        });
        await product.save();
        console.log("product added successfully....");
        next();
    } catch (err) {
        console.log("Error while inserting " + err)

    }

}
//Edit details;
export const vEditproductController = async (req, res, ) => {
    var vproduct_id = req.params.id;
    await productmodels.find({ _id: vproduct_id }).then(async (datas, err) => {
        if (err) {
            console.log("Error********************* " + err + "error occures..............");
        }
        else {
            // next();
             await productmodels.find({ vproduct_status: "Activated" })

                    .then((data, errs) => {
                        if (errs) {
                            console.log(errs + "error occures..............");
                        }
                        // res.render('pages/vendor_product', { item: data, edit: datas[0] });
                        res.json({data: datas[0]});
                    })
        }
    });
}

export const vUpdatproductController = async (req, res,next) => {
    console.log(req.body)

    try {
        var { productId, productName, productPrice, productDescription, did, dimg } = req.body;

        var productImg = '';
        try {
            productImg = req.file.filename
        } catch (err) {
            productImg = dimg;
        }

        const result = await productmodels.findByIdAndUpdate(did, {
            vproduct_name: productName,
            vproduct_price: productPrice,
            vproduct_description: productDescription,
            vproduct_imag: productImg
        });
    } catch (err) {
        console.log("error while updating " + err);
    }
    next();
    // productmodels.find({ vproduct_status: "Activated" })

    //     .then((data, errs) => {
    //         if (errs) {
    //             console.log(errs + "error occures..............");
    //         }
    //         res.render('pages/vendor_product', { item: data, edit: "" });
    //     })


    //    res.redirect('pages/vendor_product')
    //    res.render('pages/vendor_product',{item: data,edit:datas[0]});

}

export const vDeleteproductController = async (req, res,next) => {
    console.log(req.params.id)
    var status=req.params.status;
    try {
        const result = await productmodels.findOneAndUpdate({ _id: req.params.id }, {
            vproduct_status: status,
        }, { new: true });
        console.log(result);
    } catch (err) {
        console.log("error while deactivating product" + err);
    }
    next();
   }


   const vendorprofileController = async (req, res) => {
    try {
        var email = req.cookies.vendor.email
        console.log(email);
        const result = await Registration.findOne({ email: req.cookies.vendor.email });
        //  console.log(result);
        res.render('pages/vendor_profile', { data: result })
    }
    catch (error) {
        console.log(error)
    }
}
export { vendorprofileController }

const editprofile = async (req, res) => {
    try {
        const email = req.query.email;
        //    console.log("url email"+email);
        const vendorData = await Registration.findOne({ email: email });
        if (vendorData) {
            res.render('pages/vendor_update', { vendorData: vendorData })
        }
        else {
            res.redirect('pages/vendor_profile', { data: "" });
        }
    }
    catch (error) {
        console.log(error)

    }
}
export { editprofile }

const updateprofile = async (req, res) => {

    try {
        // console.log(req.body)
        
        const vendorUpdateData =await Registration.findByIdAndUpdate({ _id: req.body.vendor_id }, { $set: { name: req.body.name, email: req.body.email,contact: req.body.contact,category: req.body.category,street: req.body.street, city: req.body.city, state: req.body.state, gst_number: req.body.gst_number, aadhar_number: req.body.aadhar_number } })
        // console.log("DATA : "+vendorUpdateData);
        const vendorData = await Registration.findOne({ email: req.body.email });
        //  console.log(vendorData);
        //  res.redirect('vendor_profile')
        res.render('pages/vendor_profile', { data: vendorData });
    }
    catch (error) {
        console.log(error)
    }
}
export { updateprofile }

const cancelVendorContrller =(req,res)=>
{
    res.redirect('vendor_product')
}
export{cancelVendorContrller}

var fotp ="";
export const forgotPasswordController = async (req,res)=>{
      console.log("forget controller");
      try{
         const email = req.body.email;
         const  userData =  await Registration.findOne({email:email});
         console.log("userData"+userData);
         if(userData){
            console.log("================");
             const randomString = Randomstring.generate();
             const updateData = await Registration.updateOne({email:email},{$set:{token:randomString}});
             console.log(""+updateData);
             console.log(userData.token);
             console.log("========================");
             const {otp} = req.body
                   console.log("otp"+otp);
                   if(!otp){
                      fotp = await otpGen();
                      console.log(otp);
                      const mailOption ={
                          "from" : "anjalibagdi923@gmail.com",
                           "to"  : email,
                           "subject":'OTP for Password Reset',
                           "text": `Your OTP for password reset is ${fotp}`
                         }
                         const result= await send(mailOption);
                         console.log("sended :- "+result);
                   }
                   else{
                      if(!fotp == otp){
                      return res.render('pages/forgotpassword',{msg:"please Enter valid OTP"});
                   }else{    
                       
                    return res.render("pages/confirm_pass_vendor",{user_id:userData._id});
                   }
                 }
         }else{
             res.render('pages/vendor_login', {msg:'email is not valid'});

         }

      }catch(error){
         console.log(error.message);
      }
      
}


export const  confirmPasswordController  = async(request,response)=>{
     
    try {
        console.log("**********");
       const password = request.body.password;
       const confirmpassword = request.body.confirmpassword;
       const user_id = request.body.user_id;
       console.log(password);
       console.log(confirmpassword);
       console.log(user_id);
       const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
       const updatedData = await Registration.findByIdAndUpdate({_id:user_id},{$set:{password:hashedPassword,confirmpassword:confirmpassword,token:''}});
       response.render('pages/vendor_login', {msg:'Password Updated Successfully,now you can login here...'});

    } catch (error) {
        console.log("Error"+error);
    }

}
