import express from 'express' //returns factory function
import bodyParser from 'body-parser'
import cookieparser from 'cookie-parser'
import admin from './routes/adminRoute.js'
import index from './routes/indexRoute.js'
import usProduct from './routes/uProductRoute.js'
import seller from './routes/sellerRoute.js'
// import dotenv from 'dotenv';
// const config=dotenv.config();
const app=express() 
const port=process.env.PORT ||'3000'
app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, '/yourViewDirectory'));
app.use(cookieparser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));


app.use('/adminLogin', admin)
app.use('/userProduct', usProduct);
app.use('/vendor_registration', seller);
app.use('/', index)


app.listen(port, ()=>{
    console.log(`server listen at ${port}`);
})


// module "C:/Users/Administrator/AppData/Local/Microsoft/TypeScript/5.1/node_modules/@types/express/index"
