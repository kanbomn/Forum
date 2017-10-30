let mongoose =require("mongoose");

let orderSchema = require("../schema/orderSchema");



let orderModel = mongoose.model('order',orderSchema);

module.exports= orderModel;