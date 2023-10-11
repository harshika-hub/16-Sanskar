


export const aloginController=(req,res)=>{
    res.render('pages/admin_login');
}
const adashController=(req,res)=>{
    res.render('pages/admin_dash');
}
export{adashController}

const auserController=(req,res)=>{
    res.render('pages/user_details');
}
export{auserController}

const avendorController=(req,res)=>{
    res.render('pages/vendor_details');
}
export{avendorController}

const aproductController=(req,res)=>{
    res.render('pages/added_product');
}
export{aproductController}

const aorderController=(req,res)=>{
    res.render('pages/Orders');
}
export{aorderController}

