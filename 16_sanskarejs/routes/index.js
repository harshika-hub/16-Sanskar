import express from 'express'
const router=express.Router()
import {homeController, blogController,sellController,aboutController,registrationController } from '../controllers/indexController.js'
router.get('/', homeController)
router.get('/blogs',blogController)
router.get('/become_sell',sellController)
router.get('/About',aboutController)
router.get('/Registration',registrationController)
// router.post('/checkuser',userLoginController);

export default router