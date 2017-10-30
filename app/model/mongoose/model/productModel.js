let mongoose =require("mongoose");

let productSchema = require("../schema/productSchema");



let productModel = mongoose.model('product',productSchema);

module.exports= productModel;