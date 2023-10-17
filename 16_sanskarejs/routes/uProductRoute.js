import express from 'express'
const router=express.Router()
import { uProductController,ucartController,uprofileController,edituserprofile,updateuserprofile,userCancelController,userRegistrationController,userLoginController,authenticateJWT, authorizeUser,ureviewProductController } from '../controllers/uProductController.js'
// import { ucart } from '../controllers/uProductController.js'
router.get('/',uProductController);
router.post('/addData',userRegistrationController)
router.post('/checkuser',userLoginController)
router.get('/userToken',authenticateJWT,authorizeUser,uProductController)
router.get('/userRegistrationToken',authenticateJWT,authorizeUser,uProductController)
router.get('/cart',ucartController)
// router.get('/user_profile', uprofileController)
// router.get('/sendOtp',)
router.get('/user_profile', uprofileController)
router.get('/sendOtp',)
router.get('/userupdate',edituserprofile);
router.post('/saveuserupdate',updateuserprofile);
router.get('/userCancel',userCancelController);

router.get('/logout', (req, res) => {
  console.log("logout")
  res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
  res.render('pages/user_login', {msg:''});
});
router.post('/reviewProduct',ureviewProductController);
export default router


