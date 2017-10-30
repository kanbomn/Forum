const mongoose =require("mongoose");
const bcryptjs= require("bcryptjs");

let userSchema = new mongoose.Schema({
      name : { type : String , unique : true},
      password : { type : String },
      role: { type : Number , default: 10 },
      meta: {

      	   createAt:{type: Date ,default: Date.now() },
      	   updateAt:{ type: Date, default: Date.now()}
      }
});

userSchema.methods = {
    comparePassword: function(password, cb) {
        // this.password 数据库中的 password
        bcryptjs.compare(password, this.password, function(err, isMatch) {
            if (err) {
                return cb(err);
            }

            cb(null, isMatch);
        });
    }
}

module.exports =userSchema;