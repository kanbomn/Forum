
var userController = require("../app/controller/user");

var indexController =require("../app/controller/index");
var postController =require("../app/controller/post");

var productController= require("../app/controller/product");

var orderController =require("../app/controller/order");


module.exports = function(app){


	app.use(function(req, res, next) {
        res.locals.user = req.session.user;

        console.log(res.locals.user);
        next();
    });


  
     app.get('/', indexController.index);
     app.get('/signup',userController.show_signup);
     app.get('/signin',userController.show_signin);
      app.get('/user_logout', userController.user_logout);
     

     app.post('/user/signup', userController.signup);

     app.post('/user/signin', userController.signin);


     app.get('/post',function(req,res,next){
      res.render('post',{title:'发表'});
    });
    

      app.post('/post/new',postController.add_post);
      app.get('/post/detail', postController.detail);
      app.get('/post/edit', postController.show_edit);

     app.post('/post/edit', postController.edit_commit);
     app.get('/post/delete', postController.delete);

     app.post("/post/detail/comment", postController.commment_add);


     app.get('/products', productController.all_products);

      app.get('/product/new', function(req,res){
           
           res.render('newProduct',{title:'新增产品'});

      });

      app.post('/product/add',productController.add_product);

       app.get('/products/order', orderController.order);

       app.get("/products/orderlist",orderController.find_allorder);
    

};