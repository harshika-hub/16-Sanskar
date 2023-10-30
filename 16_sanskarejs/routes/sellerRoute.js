import express from 'express';
const router=express.Router();
import multer from 'multer';
import path from 'path';
import {vendorcreate, vregController,vproductController,vprofileController,vendorprofileController,
    editprofile,updateprofile,cancelVendorContrller,vAddproductController,vEditproductController,
    vUpdatproductController,vDeleteproductController,authenticateJWT,authorizeUser,jwt,SECRET_KEY,
    forgotPasswordController,confirmPasswordController, vendoreloginController } 
    from '../controllers/sellerController.js';

var storage=multer.diskStorage({
    destination:'./public/uploads'
    ,
    filename:(req,file,cb)=>{
        cb(null,file.filename+" "+Date.now()+path.extname(file.originalname));
        // `${Date.now()}-${file.originalname}`
    }
});
  export var upload=multer({storage:storage}).single('productImage');

router.get('/', vregController);
router.get('/vendor_product', vproductController);
router.get('/vendor_profile', vendorprofileController)
router.get('/update',editprofile);
router.post('/saveupdate',updateprofile);
router.get('/cancelVendor',cancelVendorContrller);
router.post('/addVendorproduct',upload,vAddproductController,vproductController);
router.get('/editVendorproduct/:id', vEditproductController);
router.post('/updateVendorproduct',upload, vUpdatproductController,vproductController);
router.post('/vendoradd',vendorcreate,vproductController);
router.get('/deleteVendorproduct/:status/:id', vDeleteproductController,vproductController);
router.post('/vendorlogin',vendoreloginController);
router.get('/vendorRegistrationToken',authenticateJWT,authorizeUser,vproductController);
router.get('/vendorToken',authenticateJWT,authorizeUser,vproductController);
router.post('/forgot-password',forgotPasswordController);
router.post('/confirm-password',confirmPasswordController);

router.get('/vendor_login',(req, res,next) => {
  // var role = req.params.role;
  console.log("Vendor Login");
  const token = req.cookies.jwt;
  if (token) {
      jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
          console.log(decodedToken);
          if (err) {
              console.log("err in decoded token", err);
              res.render("pages/vendor_login",{msg:""});
          } else {
              console.log("else models user");
              console.log(SECRET_KEY)
              // res.render("pages/user_profile");
              next();
          }
      });
  } else {
      console.log("lll Vendor login else");
      res.render("pages/vendor_login",{msg:" "});
  }

  // res.render('pages/user_login',{email:"",pass:"",role:role});
},vproductController);


router.get('/vendorlogout', (req, res) => {
  console.log("logout")
  res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
  res.clearCookie('vendor');
  res.render('pages/vendor_login', {msg:"LogOut Succefully"});
  console.log("after msg");
});
export default router ;