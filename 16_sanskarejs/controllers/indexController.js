

const homeController=(req,res)=>{
    res.render('pages/home');
}
export {homeController}

const blogController=(req,res)=>{
    res.render('pages/blogs');
}
export {blogController}


const sellController=(req,res)=>{
    res.render('pages/become_sell');
}
export {sellController}
const aboutController=(req,res)=>{
    res.render('pages/About')

}
export{aboutController}

const registrationController=(req,res)=>{
    res.render('pages/Registration');
}
export{registrationController}


// const userRegistrationController= async (req,res)=>{
//     try {
//         console.log("-------registration------");
//         console.log(req.body.role);
//         const {role,firstname,lastname,email,password,confirmpassword,contact,street,city,state,zipcode} = req.body
//         const existingUser = await UserRegistration.findOne({email:email});
//         if(existingUser){
//            return res.status(400).json({message:"user already exists"});
//         }
//         const hashedPassword = await bcrypt.hash(password,10); 
//         const doc= new UserRegistration({
//             role:role,
//             firstname:firstname,
//             lastname:lastname,
//             email:email,
//             password:hashedPassword,
//             confirmpassword:confirmpassword,
//             contact:contact,
//             street:street,
//             city:city,
//             state:state,
//             zipcode:zipcode

//         })
//          const result =  await doc.save()
//          console.log(result);
//          console.log("Data inserted Successfully");
//          const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY);
//         //  res.status(201).json({user:result,token:token});
//          console.log(token);
//          res.redirect("pages/userProduct");
        
//       } catch (error) {
//         console.log("Error"+error);
//         // res.status(500).json({message:"Something went wrong"});
//       }
// }
// export{userRegistrationController}

// const userLoginController = async(req,res)=>{
//     console.log("Login Success");
//     console.log(req.body.email);
//     console.log(req.body.password);
//     const {email,password} =req.body;
//     try {
//       const existingUser = await UserRegistration.findOne({email:email});
//       if(!existingUser){
//          res.render("pages/user_login",{msg:"user not found"});
//         // return res.status(400).json({message:"user already exists"});
//      }else{
//      const matchPassword = await bcrypt.compare(password,existingUser.password);
//      if(!matchPassword){
//          res.render("login",{msg:"password not match"});
//         // return res.status(400).json({message:"Invalid Credentials"});
//      }
//      const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
//      res.render("pages/userProduct");
//     }
//     } catch (error) {
//       console.log("Error"+error);
//     }
// }
// export{userLoginController}




