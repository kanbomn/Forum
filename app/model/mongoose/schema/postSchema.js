
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    
    title: { type :String },
    author: { type :String },
    article: { type :String },
    
    postImg: { type :String },
    
    comments : [{
        name: { type :String },
        
        content:{ type :String },

        meta: {

      	    createAt:{type: Date ,default: Date.now() },
      	    updateAt:{ type: Date, default: Date.now()}
      }
    }],
    
    pv: { type : Number},

    meta: {

      	    createAt:{type: Date ,default: Date.now() },
      	    updateAt:{ type: Date, default: Date.now()}
      }
});

module.exports = postSchema;
