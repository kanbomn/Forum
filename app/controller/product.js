var productModel = require("../model/mongoose/model/productModel");
var formidable = require('formidable');
var path = require("path");



exports.all_products=function(req,res){

    productModel.find({},function(err,products){
         if(err){
             //console.log(err);
            // req.flash('error','查找错误');
             return res.redirect('/');
         }
         res.render('products',{
             title:'服务首页',
             products: products
            
         });
     })
};




exports.add_product =function(req,res){

	  var imgPath = path.join( process.cwd(), '/public/images/');
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑

      
    form.uploadDir = imgPath; //设置上传目录

       
    form.keepExtensions = true; //保留后缀

    
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
  
    form.type = true;
    
    form.parse(req, function(err, fields, files) {
        

        if (err) {
            console.log(err);
            //req.flash('error','图片上传失败');
            return;
        }

        console.log(" 1 is ok");
        var file = files.productImg;//获取上传文件信息
                console.log(" 2 is ok");
        if(file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'image/jpg'){
            console.log('上传文件格式错误，只支持png,jpeg,gif');
          //  req.flash('error','上传文件格式错误，只支持png,jpeg,gif');
           // return res.redirect('/upload');
        }

            console.log(" 3 is ok");
        var name = fields.name;
        var price = fields.price;
        var description = fields.description;
        var productImg = file.path.split(path.sep).pop();
  
        // 校验参数

            console.log(" 4 is ok");
        try {
            if (!name.length) {
                throw new Error('请填写产品名称');
            }
            if (!price.length) {
                throw new Error('请填写价格');
            }
        } catch (e) {
           // req.flash('error', e.message);
           console.log(" 5 is ok");
            return res.redirect('back');
        }
        var product = new productModel({
            name: name,
            price: price,
            description: description,
            productImg:productImg
        });

            console.log(" 6 is ok");
        product.save(function(err){
            if(err){
                console.log('产品新增出现错误');
               // req.flash('err','文章发表出现错误');
                return res.redirect('/products');
            }
            console.log('产品录入成功');
          //  req.flash('success','文章录入成功');
            res.redirect('/products');
        });
    });


};