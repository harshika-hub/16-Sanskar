import '../model/mongod.js';
import fs from 'fs';
import path from 'path';
import {upload} from '../routes/seller.js'
import{ productmodels, Registration} from '../model/vendorModal.js';
// import Registration from "../model/registration.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY ="NOTESAPI";


const vregController=(req,res)=>{
    res.render('pages/vendor_registration');
}
export{vregController}


const vproductController=(req,res)=>{

    productmodels.find({})

    .then((data, err)=>{
        if(err){
            console.log(err+"error occures..............");
        }
        res.render('pages/vendor_product',{item: data,edit:''})
    })

}
export{vproductController}
 
const vprofileController=(req,res)=>{
    res.render('pages/Vendor_profile');
}
 export{vprofileController}

 
 
 const vendorcreate = async (req,res ,next)=>{
 try
 {
     console.log("Vendore registration ");
     //  console.log (req.body);
     const {role,name,email,password,confirmpassword,contact,street,city,pin_code,state,gst_number,aadhar_number,category} = req.body
     const existingvendore = await Registration.findOne({email:email});
     if(existingvendore){
         return res.status(400).json({message:"user already exists"});
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const doc= new Registration({
         role:role,
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
     const result =  await doc.save()
         //  console.log(result);  
 }
 catch (error) {
     console.log("Error"+error);
   }  
   next()
 
//  res.render('pages/Vendor_product');
 }
 export{vendorcreate}



export const vAddproductController=async(req,res)=>{
    var {productId,productName,productPrice,productPerqty,productTotalqty,productBrandname,productCategory,productMfd,productExpirydate,productDescription}=req.body;
    console.log(req.body);

    //  productmodels.find({})

    // .then((data, err)=>{
    //     if(err){
    //         console.log(err+"error occures..............");
    //     }
    //     res.render('pages/vendor_product',{item: data,edit:''})
    // })
    console.log(req.file.filename+" file");
    try{
        const product=await productmodels.create({
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
            vproduct_imag:req.file.filename,
            user_id: 1,
            vendor_categoryid: 100
        
        });
        await product.save();
        console.log("product added successfully....");

        productmodels.find({})

        .then((data, err)=>{
            if(err){
                console.log(err+"error occures..............");
            }
            res.render('pages/vendor_product',{item: data,edit:''})
        })
    }catch(err){
        console.log("Error while inserting "+err)

    }

}
//Edit details;
export const vEditproductController=(req,res)=>{
    var vproduct_id=req.params.vproduct_id;
    productmodels.find({vproduct_id:vproduct_id}).then((datas,err)=>{
        if(err)
        {
            console.log("Error "+err);
        }
        else{

            productmodels.find({})

            .then((data, errs)=>{
                if(errs){
                    console.log(errs+"error occures..............");
                }
                res.render('pages/vendor_product',{item: data,edit:datas[0]});
            })
        }
    });
}

export const vUpdatproductController=async (req,res)=>{

   try{
    console.log(req.body)
    var {productId,productName,productPrice,productDescription}=req.body;

    const result=await productmodels.findByIdAndUpdate(req.params.id,{ 
         vproduct_name:productName ,
        vproduct_price: productPrice,
        vproduct_description:productDescription,
    });
   }catch(err){
    console.log("error while updating "+err);
   }

   productmodels.find({})

   .then((data, errs)=>{
       if(errs){
           console.log(errs+"error occures..............");
       }
       res.render('pages/vendor_product',{item: data,edit:""});
   })
//    res.redirect('pages/vendor_product')
//    res.render('pages/vendor_product',{item: data,edit:datas[0]});

}