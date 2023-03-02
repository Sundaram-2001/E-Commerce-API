const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const Order=require("../models/orders");
const Product=require("../models/product")

router.get("/",(req,res,next)=>{
    // Order
    Order.find()
    .populate('product')
    // .select('product quantity _id')
    .exec()
    .then( result=>{
        res.status(200).json({
            // Orders:result
            count:result.length,
            orders:result,
            request:{
                type:'GET',
                URL:'localhost:150/orders/'
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            // Encountered Error:err;
            Error:err
        })
    })
})
router.get('/:orderId',(req,res,next)=>{
    Order.findById(req.params.orderId)
    .exec()
    .then(result=>{
        res.status(200).json({
            orderDetails:{
                order:result
            }
        })
    })
    .catch(err=>{
        res.status(404).json({
            "message":"No orders with id " + req.params.orderId+" " + "found, kindly check the orderId again!"
        })
    })
})
router.post("/",(req,res,next)=>{
    Product.findById(req.body.ProductId)
    .then(product=>{
        const order=new Order({
            _id:new mongoose.Types.ObjectId,
            product:req.body.ProductId,
            quantity:req.body.quantity
        })
        return order.save();
    })
    .then(result=>{
        console.log(result);
        res.status(200).json({
            createdOrder:{
                _id:result._id,
                product:result.product,
                quantity:result.quantity     
                // Id:req.params.product 
            }
        });
    })
    
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    })
})
router.delete("/:orderId",(req,res,next)=>{
    Order.findById({_id:req.params.orderId},err=>{
        if(!err){
            res.status(200).json({
                "message":"Order"+" "+req.params.orderId+" "+"has been deleted successfully!"
            })
        }
        else{
            res.status(404).json({
                "message":"Order"+" "+req.params.orderId+" "+"not found,kindly enter a valid orderId!"
            })
        }
    })
})
module.exports = router;