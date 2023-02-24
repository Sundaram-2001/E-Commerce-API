const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");   
const Product = require('../models/product'); 
const mongoose = require('mongoose');

router.get('/',(req,res,next)=>{
    Product.find(function(result,err){
        if(result){
            const details=result.JSON(stringify);
            res.send(details);
        }
        else{
            res.send(err);
        }
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


router.post('/',(req,res,next)=>{
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
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
    

// router.patch('/:productId',(req,res,next)=>{
//     const Id=req.params.productId;
//     Product.update(
//         {name:req.body.newName},
//         {price: req.body.newPrice},
//         function(err){
//           if (!err){
//             res.send("Successfully updated the product");
//           } else {
//             res.send(err);
//           }
//         });
// })
module.exports=router;