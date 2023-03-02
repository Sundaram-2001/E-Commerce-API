const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");   
const Product = require('../models/product'); 
// const multer=require("multer");
const mongoose = require('mongoose');
const multer = require("multer");
// const upload=multer({dest:'uploads/'});

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');      //null defines some potential error
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==="image/png" || file.mimetype==="image/jpeg" || file.mimetype==="image/gif" || file.mimetype==="jpg"){
            cb(null,true);
        }
        else{
            cb(null,false);
            return cb(new Error("Only PNG files Accepted!"))
        }
    }
})


router.get('/',(req,res,next)=>{
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(details=>{
        const result={
            count:details.length,
            items:details
        };
        res.status(200).json(result);
    })
})

//Retrieving the product details based on the productId
router.get('/:productId',(req,res,next)=>{
    const Id=req.params.productId;
    Product.findById((Id),function(err,product){
        if(product){
            const details=JSON.stringify(product);  
            res.send(details);
        }
        else{
            res.send(err);
        }
    })
})

//Retrieving the product details by the name
router.get('/:productName',(req,res,next)=>{
    // const pName=req.body.name;
    const productName=req.params.productName;         
    Product.findOne({name:productName},function(result,err){
        if(!err){
            const details=JSON.stringify(result);
            res.send(details);  
        }
        else{
            console.log("Sorry we encountered an error,hang-in there!")
            res.send(err);
        }
    })
})


router.post('/',upload.single('productImage'),(req,res,next)=>{
    console.log(req.file);
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
    });
    product.save(err=>{
        res.status(200).json({
            message:"Product Added Successfully!",
            createdProduct: product
        })
    })
})

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id:id})
        .exec()
    .then(result=>{
        res.status(200).json(result)
    })
    })
    


module.exports=router;