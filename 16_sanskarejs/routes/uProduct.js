import express from 'express'
const router=express.Router()
import { uProductController,ucartController,uprofileController,uloginController,userRegistrationController } from '../controllers/uProductController.js'
// import { ucart } from '../controllers/uProductController.js'
router.get('/',uProductController);
router.post('/adddata',userRegistrationController,uProductController)
router.get('/cart',ucartController)
router.get('/user_profile', uprofileController)
router.get('/user_login',uloginController);
export default router
// router.post('/addData',userRegistrationController)


