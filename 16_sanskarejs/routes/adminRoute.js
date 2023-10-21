import express from 'express'
import { aloginController, avalidateController, authenticate, adashController, auserController, avendorController, aproductController, aorderController, aDeactivateUserController, aLogOutController,adminvendorController,productAllow,forgotPasswordController,confirmPasswordController } from '../controllers/adminController.js'
const router = express.Router();

router.get('/', aloginController);
router.post("/admin_validate", avalidateController);
router.get('/adminToken', authenticate, adashController);
router.get('/admin_dash', adashController);
// router.get('/admin_dash', adashController)
// router.get('/vendor_details', avendorController);
router.get('/vendor_details', adminvendorController)
router.get('/added_product', aproductController);
router.get('/Orders', aorderController);
router.get('/user_details', auserController);
router.get('/adminLogout', aLogOutController);

router.post('/deactivateUser/:email', aDeactivateUserController);
router.get('/productShow/:sbtn/:pid',productAllow);
router.post('/forgot-password',forgotPasswordController);
router.post('/confirm-password',confirmPasswordController)

export default router 