import express from 'express'
const router=express.Router()
import multer from 'multer';
import path from 'path';
import {vendorcreate, vregController,vproductController,vprofileController,vAddproductController,vEditproductController,vUpdatproductController } from '../controllers/sellerController.js'


var storage=multer.diskStorage({
    destination:'./public/uploads'
    ,
    filename:(req,file,cb)=>{
        cb(null,file.filename+""+Date.now()+path.extname(file.originalname));
    }
});
  export var upload=multer({storage:storage}).single('productImage');

router.get('/', vregController)
router.get('/vendor_product', vproductController)

router.get('/Vendor_profile', vprofileController)
// router.post('/addVendorproduct',upload.single('productImage'),vAddproductController)
router.post('/addVendorproduct',upload,vAddproductController)

router.get('/editVendorproduct/:vproduct_id', vEditproductController)
router.post('/updateVendorproduct/:id', vUpdatproductController)




router.post('/vendoradd',vendorcreate,vproductController)


export default router 