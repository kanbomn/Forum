const userModel = require("../model/mongoose/model/userModel");





exports.user_req = function(req, res, next) {
    let user = req.session.user;

    if (!user) {
        console.log('未登录，没有访问权限！')
        return res.redirect('/signin');
    }

    next();
};


exports.show_signup = function(req, res) {
    res.render('signup', {
        title: '注册页'
    });
};

exports.show_signin = function(req, res) {
    res.render('signin', {
        title: '登录页'
    });
};

exports.user_logout = function(req, res) {
    delete req.session.user;

    // 重定向
    console.log('注销成功！')
    res.redirect('/');
};




exports.signup =function(req,res){

	 var username = req.body["username"];

	var userObj ={
           name: req.body["username"],
           password:req.body['password']

	};
    
    if (req.body['password'] != req.body['password-repeat'])
    {

    	console.log("Please confirm the password again");
    	
    	return  res.redirect("/signup");
    }
	userModel.findOne({ name : username},function(err,user){
       if( err){

           console.log(err);
       }

       if(user){
           console.log(" The usename is exists");

           return res.redirect('/signup');

       } else{

       	 let newUser = new userModel(userObj);

       	 newUser.save(function(err,user){
              if(err){
              	console.log(err);


              }

              console.log("register successfully");
              res.redirect("/signin");
       	 });
       }

	});


};



exports.signin=function( req,res){
    
    var password = req.body.password;
      //检查用户是否存在
      userModel.findOne({ name : req.body.username},function(err,user){
          if(err){
              console.log('error','err');
             // req.flash('error','登录出错');
              return res.redirect('/');
          }
          //用户不存在
          if(!user){
              console.log('error','用户不存在');
             // req.flash('error','用户不存在');
              return res.redirect('/signin');
          }

          //判断密码是否一致
          if(user.password != password){
              console.log('error','密码错误');
            //  req.flash('error','密码错误');
              return res.redirect('/signin');
          }

          else{ 
               req.session.user = user;
          	console.log(user.username);
          //req.flash('success','登录成功');
          res.redirect('/');}
          
      });
   

};