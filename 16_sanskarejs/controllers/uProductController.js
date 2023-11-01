import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { otpGen } from "otp-gen-agent";
import dotenv from "dotenv";
import Randomstring from "randomstring";
import { productmodels } from "../model/vendorModal.js";
import UserRegistration from "../model/indexModal.js";
import { send } from '../model/mail.model.js'
import paypal from 'paypal-rest-sdk'
import { userReview, UserCart, placeOrder, customerPayment } from "../model/userModel.js";


const { PAYPAL_MODE, PAYPAL_CLIENT_KEY, PAYPAL_SECRET_KEY } = process.env;
console.log(PAYPAL_MODE);
paypal.configure({
    'mode': PAYPAL_MODE, //sandbox or live
    'client_id': PAYPAL_CLIENT_KEY,
    'client_secret': PAYPAL_SECRET_KEY
});

const SECRET_KEY = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
dotenv.config();
const maxAge = (5 * 24 * 60 * 60 * 1000);

export default jwt;
let payload = {};
let token;

const uProductController = (req, res) => {

    productmodels.find({
        $and: [{ vproduct_status: "Activated" },
        { vproduct_type: "single" },
        { vproduct_show: "Shown" }]
    })

        .then((data, err) => {
            if (err) {
                console.log(err + "error occures..............");
            }
            res.render('pages/userProduct', { item: data })
        })

}
export { uProductController }

const uprofileController = async (req, res) => {

    try {
        var email = req.cookies.customer.email
        console.log(email);
        const result = await UserRegistration.findOne({ email: req.cookies.customer.email });
        //  console.log(result);
        res.render('pages/user_profile', { data: result })

    }
    catch (error) {
        console.log(error);
    }
}
export { uprofileController }

const edituserprofile = async (req, res) => {
    try {
        const email = req.query.email;
        //    console.log("url email"+email);
        const userData = await UserRegistration.findOne({ email: email });
        if (userData) {
            res.render('pages/user_update', { userData: userData })
        }
        else {
            res.redirect('pages/user_profile', { data: "" });
        }
    }
    catch (error) {
        console.log(error)

    }
}
export { edituserprofile }

const updateuserprofile = async (req, res) => {
    try {
        // console.log(req.body)
        const userUpdateData = await UserRegistration.findByIdAndUpdate({ _id: req.body.customer_id }, { $set: { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, contact: req.body.contact, category: req.body.category, street: req.body.street, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode } })
        // console.log("DATA : "+vendorUpdateData);
        const UserData = await UserRegistration.findOne({ email: req.body.email });
        //  console.log(vendorData);
        //  res.redirect('vendor_profile')
        res.render('pages/user_profile', { data: UserData });
    }
    catch (error) {
        console.log(error)
    }
}
export { updateuserprofile }

const userCancelController = (req, res) => {

    res.redirect('/userProduct');
}
export { userCancelController };



var votp = '';

const userRegistrationController = async (req, res, next) => {

    try {
        console.log("-------registration------");
        const { firstname, lastname, email, password, confirmpassword, contact, street, city, state, zipcode, otp } = req.body

        const existingUser = await UserRegistration.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" });
        }
        if (!otp) {
            votp = await otpGen(); // '344156'  (OTP length is 6 digit by default)
            console.log(otp);
            const mdata = {
                "from": "harshika.p3.hp@gmail.com",
                "to": email,
                "subject": " Otp for verification",
                "text": `Your otp for registering on 16-Sanskar is:${votp}`,
            }
            const r = await send(mdata);
            console.log("sended :- " + r)
            console.log('otp in user registration '+votp)


        } else {
            if (!votp == otp)
                return res.render('pages/Registration', { msg: " please Enter valid otp" });


            const hashedPassword = await bcrypt.hash(password, 10);
            const result = new UserRegistration({
                role: "customer",
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedPassword,
                confirmpassword: confirmpassword,
                contact: contact,
                street: street,
                city: city,
                state: state,
                zipcode: zipcode

            })
            await result.save()
            console.log(result);
            payload.result = result;
            const expireTime = {
                expiresIn: '1d'
            }
            console.log("Data inserted Successfully");
            token = jwt.sign(payload, SECRET_KEY, expireTime);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
            if (!token) {
                res.json({ message: "Error occured with token" })
            } else {
                console.log(token);
                const customer = {
                    email: email,
                    // password:hashedPassword,
                    role: "customer"
                }
                res.cookie("customer", customer);

                res.redirect("userRegistrationToken");
            }
        }
    } catch (error) {
        console.log("Error" + error);
    }

}
export { userRegistrationController }

const userLoginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        console.log("check");
        const existingUser = await UserRegistration.findOne({ email: email });
        payload.result = existingUser;
        const expireTime = {
            expiresIn: '1d'
        }
        if (!existingUser) {
            // return res.status(400).json({message:"user not registered yet ,please registered here "});
            return res.render('pages/user_login', { msg: "user not registered yet ,please registered here " });
        }
        else {
            const matchPassword = await bcrypt.compare(password, existingUser.password);
            if (!matchPassword) {
                return res.render('pages/user_login', { msg: "Password Not matched.....Please Enter correct Password " });
            } else {

                token = jwt.sign(payload, SECRET_KEY, expireTime);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                if (!token) {
                    res.json({ message: "Error occured with token" })
                } else {
                    const customer = {
                        email: email,
                        role: "customer"
                    }
                    res.cookie("customer", customer, { maxAge: maxAge });
                    res.redirect("userToken");

                }

            }
        }
    } catch (error) {
        console.log("Error" + error);
    }
}
export { userLoginController }

export const authenticateJWT = (request, response, next) => {
    console.log("authenticateJWT : ");
    const token = request.cookies.jwt;
    if (!token) {
        response.json({ message: "Error Occured while dealing with Token inside authenticateJWT" });
    }
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err)
            res.render('pages/user_login', { msg: "Token is not valid " });
        request.payload = payload;
        next();
    });
}

export const authorizeUser = (request, response, next) => {
    console.log("5", request.payload.result.email);
    next();
}
export { jwt, SECRET_KEY }

export const ureviewController = (request, response) => {
    var email = request.cookies.customer.email
    console.log(email);
}
export const ureviewProductController = async (request, response) => {
    console.log("==================")
    try {
        const { productId, review } = request.body;
        console.log(request.body);
        const email = request.cookies.customer.email;
        console.log(email)
        const result = new userReview({
            productId: productId,
            email: email,
            review: review
        })
        const items = await productmodels.find()
        console.log(result);
        await result.save();
        console.log("Data inserted Successfully");
        response.render("pages/userproduct", { item: items });
    } catch (error) {
        console.log("Error" + error);
    }
}
export const ucomboController = async (req, res) => {
    try {
        const data = await productmodels.find({ $and: [{ vproduct_type: 'combo' }, { vproduct_status: 'Activated' }, { vproduct_show: "Shown" }] });
        res.render('pages/userProduct', { item: data });

    } catch (err) {
        console.log("Error while fetching combo " + err);
    }

}

export const usanskarController = async (req, res) => {
    try {
        var sanskar = req.params.sanskar;
        var data = await productmodels.find({ $and: [{ sanskar: sanskar }, { vproduct_show: "Shown" }, { vproduct_status: "Activated" }] });
        res.render('pages/userProduct', { item: data });

    } catch (err) {
        console.log("Error while fetching specific sanskars products" + err);

    }


}

var fotp = "";
export const forgotPasswordController = async (req, res) => {
    console.log("forget controller");
    try {
        const email = req.body.email;
        const userData = await UserRegistration.findOne({ email: email });
        console.log("userData" + userData);
        if (userData) {
            console.log("================");
            const randomString = Randomstring.generate();
            const updateData = await UserRegistration.updateOne({ email: email }, { $set: { token: randomString } });
            console.log("" + updateData);
            console.log(userData.token);

            //  const forgotpassword = {
            //     token:randomString
            // }
            // res.cookie("forgotpassword",forgotpassword);
            console.log("========================");
            const { otp } = req.body
            console.log("otp" + otp);
            if (!otp) {
                fotp = await otpGen();
                console.log(otp);
                const mailOption = {
                    "from": "anjalibagdi923@gmail.com",
                    "to": email,
                    "subject": 'OTP for Password Reset',
                    "text": `Your OTP for password reset is ${fotp}`
                }
                const result = await send(mailOption);
                console.log("sended :- " + result);
            }
            else {
                if (!fotp == otp) {
                    return res.render('pages/forgotpassword', { msg: "please Enter valid OTP" });
                } else {

                    return res.render("pages/confirm_pass_user", { user_id: userData._id });
                }
            }
        } else {
            res.render('pages/user_login', { msg: 'email is not valid' });

        }

    } catch (error) {
        console.log(error.message);
    }

}

export const confirmPasswordController = async (request, response) => {

    try {
        console.log("**********");
        const password = request.body.password;
        const confirmpassword = request.body.confirmpassword;
        const user_id = request.body.user_id;
        console.log(password);
        console.log(confirmpassword);
        console.log(user_id);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const updatedData = await UserRegistration.findByIdAndUpdate({ _id: user_id }, { $set: { password: hashedPassword, confirmpassword: confirmpassword, token: '' } });
        response.render('pages/user_login', { msg: 'Password Updated Successfully,now you can login here...' });

    } catch (error) {
        console.log("Error" + error);
    }

}
const ucartController = async (req, res) => {
    var email = req.cookies.customer.email;
    const cdatas=  await UserRegistration.findOne({email:email});

    const resu =   await UserCart.find({customer_id:cdatas._id});
    for(var i=0;i<resu.length;i++)
    {
        var vd=await productmodels.findOne({_id:resu[i].product_id});
        if(parseInt(vd.vproduct_totalqty)<resu[i].total_product)
        {
            await UserCart.updateOne({_id:resu[i]._id},{$set:{total_product:parseInt(vd.vproduct_totalqty)

            }})
        }
    }

    console.log('ucartcontroller')
    var email = req.cookies.customer.email;
    const cdata = await UserRegistration.findOne({ email: email });
    console.log(cdata);
    const result = await UserCart.find({ $and: [{ customer_id: cdata._id }, { order: "No" }] });
    console.log(result);
    var data = result;
    if (result) {
        let totalBill = 0;
        data.forEach((item, index) => {
            if (item.order == "No") {
                //   totalBill += parseInt( item.product_price) * parseInt(item.total_product);
                totalBill += parseInt(item.product_price);
            }
        })
        console.log(totalBill);
        res.render('pages/cart', { data: result, totalBill: totalBill });
    }
}
export { ucartController }



export const removeUserProduct = async (req, res) => {
    const id = req.params.id;

    const del = await UserCart.deleteOne({ _id: id });
    // console.log(del);

    var email = req.cookies.customer.email;
    const cdata = await UserRegistration.findOne({ email: email });
    const result = await UserCart.find({ customer_id: cdata._id });
    // console.log(result);
    if (result) {
        res.render('pages/cart', { data: result, totalBill: "" });
    }

}
export const minus = async (req, res) => {
    const pid = req.params.product;
    const quantity = req.params.quantity;
    var price = parseInt(req.params.price);
    try {
        const result = await UserCart.updateOne({ _id: pid }, { $set: { total_product: quantity, product_price: price } });
        console.log("quantity -");
        console.log(result);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
}
export const plus = async (req, res) => {
    const pid = req.params.product;
    const quantity = req.params.quantity;
    var price = parseInt(req.params.price);
    console.log(price + "price is ")
    var ucart = await UserCart.findById({ _id: pid });
    var vdata = await productmodels.findById({ _id: ucart.product_id });
    console.log(vdata);
    const total = parseInt(vdata.vproduct_totalqty);
    // console.log("product price quantity"+total);
    try {
        if (total >= quantity) {
            const result = await UserCart.updateOne({ _id: pid }, { $set: { total_product: quantity, product_price: price } });
            console.log("quantity +" + result);
            var results = { vdata: vdata, ucart: ucart };
            res.json(results);
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const addCartController = async (req, res) => {
    try {
        const id = req.params.id;
        var email = req.cookies.customer.email;
        // console.log(result);
        var data = await productmodels.findOne({ _id: id });
        const cdata = await UserRegistration.findOne({ email: email });
        //console.log("UserRegistration data ===========================================================================================");
        //  console.log(cdata);
        var pm = Math.floor(data.vproduct_price * 125 / 100);
        const result = new UserCart({
            vendor_id: data.user_id,
            product_id: data._id,
            product_name: data.vproduct_name,
            product_price: pm,
            per_product_price: pm,
            product_image: data.vproduct_imag,
            per_product_quntity: data.vproduct_perqty,
            product_brand: data.vproduct_brandnamae,
            customer_id: cdata._id,
        });
        await result.save();
        // console.log(result);
        res.redirect('/userProduct');
    }
    catch (err) {
        console.log("Error while add to cart in data base " + err);
    }
}
export const placeOrderController = async (req,res)=>{
    console.log("place order controller");
    try {
       const customer =  req.params.customer;


       const result =  await UserCart.find({
        $and:[{customer_id:customer},
              {order:"No"}]
         })
       var data = result
       var totalBill = 0;
       if (result) { 
           data.forEach((item, index) => { 
           if (item.order == "No") { 
           totalBill += item.product_price;
           }
           })
           console.log("total bill in placecontroller ",totalBill);
           // res.render('pages/cart', {data:result,totalBill:totalBill});
       }
       console.log(data)
       var cartsid =[];
       for(var i=0;i<data.length;i++){
           cartsid.push(data[i]._id);
       }
       res.json({placeorder:data,totalbill:totalBill})
    } catch (error) {
       console.log("error"+error);
    }
}

export const confirmOrderController = async(req,res)=>{
    console.log("confirmorder controller");
    try {
        const customer =  req.params.customer;
        const totalbill= req.params.totalbill;
        const cartId= req.params.id;
        console.log(customer);
        console.log(cartId);
        const result =  await UserCart.find({customer_id:customer})
        var data = result
        var totalBill = 0;
        if (result) { 
            data.forEach((item, index) => { 
            if (item.order == "No") { 
            totalBill += parseInt( item.per_product_price) * parseInt(item.total_product);
            }
            })
            console.log("totalbill "+totalBill);
            // res.render('pages/cart', {data:result,totalBill:totalBill});
        }
            var cartsid =[];
            for(var i=0;i<data.length;i++){
                cartsid.push(data[i]._id);
            }
            const result1=  new placeOrder({
                cart_id : cartsid, 
                total_price:totalBill,
                date:Date.now()
            }) 
            await result1.save();
        
            const placeorder = await placeOrder.findOne({ _id: result1._id })   
            
            if(cartId){
                console.log(placeorder);
                console.log(result);
                return res.render('pages/generate_bill', {orders:placeorder,data:result});
            }
            else{
                console.log("jai shree ram")
                console.log(placeorder);
                res.json({placeorder:placeorder})
            }    
    }catch (error) {
       console.log("error"+error);
    }
}

export const upayController = async (req, res) => {

    try {
        var email = req.cookies.customer.email;
        const cdata = await UserRegistration.findOne({ email: email });
        console.log(cdata);
        const uresult = await UserCart.find({ $and: [{ customer_id: cdata._id }, { order: "No" }] });
        console.log("cart data ", uresult);
        var cartarray = [];
        var total = 0;
        for (var i = 0; i < uresult.length; i++) {
            cartarray[i] = {};
            cartarray[i].name = uresult[i].product_name;
            cartarray[i].sku = uresult[i]._id;
            cartarray[i].price = uresult[i].per_product_price;
            cartarray[i].currency = "USD"
            cartarray[i].quantity = uresult[i].total_product;
            total += uresult[i].product_price;
        }
        console.log("cartArray", cartarray);

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/userProduct/paysuccess",
                "cancel_url": "http://localhost:3000/userProduct/paycancel"
            },
            "transactions": [{
                "item_list": {
                    "items": cartarray
                },
                "amount": {
                    "currency": "USD",
                    "total": total
                },
                "description": "Products from 16-Sanskar"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });

    } catch (error) {
        console.log(error.message);
    }

}


export const successPay = async (req, res) => {

    try {
        var email = req.cookies.customer.email;
        const cdata = await UserRegistration.findOne({ email: email });
        const uresult = await UserCart.find({
            $and: [
                { customer_id: cdata._id },
                { order: "No" }
            ]
        });
        const updateResult = await UserCart.updateMany(
            {
                $and: [
                    { customer_id: cdata._id },
                    { order: "No" }
                ]
            },
            {
                $set: { order: "Yes" }
            }
        );

        var total = 0;
        for (var i = 0; i < uresult.length; i++) {

            total += uresult[i].product_price;
        }
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": total
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log("payment execute--------------------- ", JSON.stringify(payment));
                // var paydate = Date.now();
                // var paytable = customerPayment.create({
                //     pay_customer_id: cdata._id,
                //     pay_account: "851245",

                // });

                res.render("pages/paysuccess");
            }
        });

    } catch (error) {
        console.log(error.message);
    }

}

export const cancelPay = async (req, res) => {

    try {

        res.render('pages/paycancel');

    } catch (error) {
        console.log(error.message);
    }

}