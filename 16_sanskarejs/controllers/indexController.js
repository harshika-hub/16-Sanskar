

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
    res.render('pages/Registration',{msg:""});
}
export{registrationController}


const loginController=(req,res)=>{
    res.render('pages/user_login',{msg:""});
}
export{loginController}





