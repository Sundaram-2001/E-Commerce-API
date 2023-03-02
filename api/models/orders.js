const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',requires:true},
    
    quantity:{type:Number,default:1}

    // module.exports=new mongoose.model('Order',orderSchema);

})

module.exports=new mongoose.model('Order',orderSchema);
    