import express from 'express'
const router=express.Router()
import { aloginController,adashController,auserController,avendorController,aproductController,aorderController } from '../controllers/adminController.js'
router.get('/', aloginController)
// router.post("/admin_validate")
router.get('/admin_dash', adashController)


// router.get('/admin_dash', adashController)
router.get('/user_details', auserController)
router.get('/vendor_details', avendorController)
router.get('/added_product', aproductController);
router.get('/Orders', aorderController);

export default router 