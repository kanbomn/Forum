const mongoose =require("mongoose");


let orderSchema = new mongoose.Schema({
       
       orderID : { type : String , unique : true},
       
       client : { type :String },
       
       amount : { type : Number },
       status:  { type : String },

       orderContent:{ type :String},
       meta: {

      	   createAt:{type: Date ,default: Date.now() },
      	   updateAt:{ type: Date, default: Date.now()}
      }
});



module.exports =orderSchema;
