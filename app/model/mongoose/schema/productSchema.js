
const mongoose =require("mongoose");


let productSchema = new mongoose.Schema({
      name : { type : String , unique : true},
      price: { type : Number },
      productImg: { type : String },
      description : { type : String},
      meta: {

      	   createAt:{type: Date ,default: Date.now() },
      	   updateAt:{ type: Date, default: Date.now()}
      },
     count: {type :Number, default: 0}
});



module.exports =productSchema;