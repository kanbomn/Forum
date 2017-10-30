const postModel = require("../model/mongoose/model/postModel");



exports.index = function(req, res) {
    // console.log(req.session.user);

    // user 的 session 信息存放在 locals 中变成本地变量，在每个模板页面中都能拿到，不用每次都用 render 传递 user
    // app.locals.user = req.session.user;
  postModel.find({},function(err,posts){
         if(err){
             //console.log(err);
            // req.flash('error','查找错误');
             return res.redirect('/');
         }
         res.render('index',{
             title:'首页',
             posts: posts
            
         });
     })
    
};