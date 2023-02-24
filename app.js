const express=require('express');
const app=express();
const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');
const morgan=require("morgan");
const bodyParser=require("body-parser");    
const mongoose=require("mongoose");
// mongoose.connect()


// mongoose.connect('mongodb://localhost/ecomDB').then(() => {
// console.log("Connected to Database");
// }).catch((err) => {
//     console.log("Not Connected to Database ERROR! ", err);
// });

mongoose.connect('mongodb://127.0.0.1/ecomDB')


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);


app.use((req,res,next)=>{
    const error=new Error();
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports=app;