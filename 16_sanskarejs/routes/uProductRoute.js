import express from 'express'
const router=express.Router()
import { uProductController,ucartController,uprofileController,edituserprofile,updateuserprofile,userCancelController,
  userRegistrationController,userLoginController,authenticateJWT, authorizeUser,ureviewProductController,ucomboController,
  usanskarController,forgotPasswordController,confirmPasswordController,removeUserProduct,addCartController,plus,minus,confirmOrderController} from '../controllers/uProductController.js'
// import { ucart } from '../controllers/uProductController.js'
router.get('/',uProductController);
router.get('/user_product',uProductController);
router.post('/addData',userRegistrationController)
router.post('/checkuser',userLoginController)
router.get('/userToken',authenticateJWT,authorizeUser,uProductController)
router.get('/userRegistrationToken',authenticateJWT,authorizeUser,uProductController)
router.get('/cart',ucartController);
router.get('/user_profile', uprofileController);
router.get('/sendOtp',)
router.get('/userupdate',edituserprofile);
router.post('/saveuserupdate',updateuserprofile);
router.get('/userCancel',userCancelController);

router.get('/logout', (req, res) => {
  console.log("logout")
  res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
  res.cookie("customer",'');

  res.render('pages/user_login', {msg:''});
});
router.post('/reviewProduct',ureviewProductController);
router.get('/comboProduct',ucomboController)
router.get('/bySanskar/:sanskar',usanskarController)
router.post('/forgot-password',forgotPasswordController);
router.post('/confirm-password',confirmPasswordController);

router.get('/addcart/:id',addCartController);
router.get('/removeUserProduct/:id',removeUserProduct);
router.get('/minus/:product/:quantity/:price',minus);
router.get('/plus/:product/:quantity/:price',plus);
// router.get('/placeOrder',placeOrderController)
router.get('/confirm-order/:customer/:totalbill',confirmOrderController)
router.get('/generate_bill/:customer/:totalbill/:cartId',confirmOrderController)

export default router


