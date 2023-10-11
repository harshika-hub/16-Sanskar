import express from 'express' //returns factory function
import bodyParser from 'body-parser'
const app=express() 
const port=process.env.PORT ||'3000'
import admin from './routes/admin.js'
import index from './routes/index.js'
import usProduct from './routes/uProduct.js'
import seller from './routes/seller.js'
app.set('view engine', 'ejs')
// import path from 'Path'
// app.set('views', path.join(__dirname, '/yourViewDirectory'));
app.use(bodyParser.urlencoded({extended:false}))
// app.use(__dirname+'/image')
// app.use('/admin_dash', admin)
app.use('/adminLogin', admin)
app.use('/userProduct', usProduct);
app.use('/vendor_registration', seller);
app.use('/', index)

app.use(express.static('public'));

app.listen(port, ()=>{
    console.log(`server listen at ${port}`);
})


// module "C:/Users/Administrator/AppData/Local/Microsoft/TypeScript/5.1/node_modules/@types/express/index"
