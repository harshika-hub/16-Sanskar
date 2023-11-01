import mongoose from "mongoose";
// mongoose.connect('mongodb://127.0.0.1:27017/16_sanskar').then(()=>{
mongoose.connect('mongodb+srv://harshikaji:zSzJBu6n2X2ZfUsn@clusterh.unlpj0o.mongodb.net/16_sanskar?retryWrites=true&w=majority').then(()=>{

    console.log("connected");
}).catch((err)=>{
    console.log("error occured "+err);
});

// mongodb+srv://<username>: zSzJBu6n2X2ZfUsn@clusterh.unlpj0o.mongodb.net/?retryWrites=true&w=majority
