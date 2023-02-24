const express=require("express");
const router=express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"All the orders fetched successfully!"
    })
})

router.get('/:orderId&:productId',(req,res,next)=>{
    const order = req.params.orderId
    const product = req.params.productId
    res.status(200).json({
        // const productNumber:Number(req.params.productId)
        message:"Order for product-"+product+" "+"successfully placed with orderId-"+order

    })
})

router.post('/',(req,res,next)=>{
    const order={
        orderId:req.body.id,
        orderDate:req.body.orderDate
    }
    res.status(200).json({
        message:"Here,the orders you placed in last week!",
        orderDetail:order
    });
});

router.get('/:orderNumber',(req,res,next)=>{
    const orderId=req.params.orderNumber;
    res.status(200).json({
        message:"Order Details of order number:"+" "+orderId,
        orderId:req.params.orderNumber
    })
})


router.patch('/:orderNumber',(req,res,next)=>{
    res.status(200).json({
        message:"Order Details of order number-"+" "+req.params.orderNumber+" "+"successfully updated!"
    })
})

router.delete('/:orderNumber',(req,res,next)=>{
    res.status(200).json({
        message:"Order number "+req.params.orderNumber+" "+"cancelled successfully!"
    })
})

module.exports = router;