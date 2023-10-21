import express from 'express'
const router=express.Router()
import {homeController, blogController,sellController,aboutController,registrationController,loginController} from '../controllers/indexController.js'
import {jwt,SECRET_KEY, uProductController} from '../controllers/uProductController.js'
router.get('/', homeController)
router.get('/blogs',blogController)
router.get('/become_sell',sellController)
router.get('/About',aboutController)
router.get('/Registration',registrationController)
router.get('/user_login', (req, res,next) => {
  console.log("user Login ");
  const token = req.cookies.jwt;
  if (token) {
      jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
          console.log(decodedToken);
          if (err) {
              console.log("err", err)
              res.render("pages/user_login",{msg:""});
          } else {
              console.log("else models user");
              console.log(SECRET_KEY)
              // res.render("pages/user_profile");
              next();
          }
      });
  } else {
      console.log("lll");
      res.render("pages/user_login",{msg:""});
  }

  // res.render('pages/user_login',{email:"",pass:"",role:role});
},uProductController);

export default router