var productModel = require("../model/mongoose/model/productModel");

var orderModel = require("../model/mongoose/model/orderModel");


exports.order = function(req, res) {
    // 取到 url '/detail/:id' 中的 id
    let id = req.query.id;
    
    productModel.findById(id, function(err, product) {
         
         var orderObj={

         	orderID : Date.now(),
         	orderContent : product.description,
         	amount : product.price,

         	status :"待支付",
         	client : req.session.user.name,

         	orderTime: Date.now()
         }

         var order =new orderModel(orderObj);

         order.save(function(err){
             
             if (err)
             {
                console.log("save the order error");
             }
             else
             	console.log(" Save the order successfully");
         });
       
       console.log("THis part run succesfully");
       res.render('order', {
                title: '订单详情页',
                orderObj
            });
        });
};

exports.find_allorder=function(req,res){
      var user=req.session.user.name;

      orderModel.find({ client : user},function(err,orders){
           
          res.render("orderlist",{

              title: "订单列表",
              orders: orders
          })
      });
};