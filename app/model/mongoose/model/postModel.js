var postSchema= require("../schema/postSchema");
var mongoose = require("mongoose")


let postModel = mongoose.model('post',postSchema);

module.exports= postModel;
