var postModel = require("../model/mongoose/model/postModel");
var formidable = require('formidable');
var path = require("path");

exports.add_post =function(req,res){

	  var imgPath = path.join( process.cwd(), '/public/images/');
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑

        console.log(" -1 is ok");
    form.uploadDir = imgPath; //设置上传目录

        console.log(" 0 is ok");
    form.keepExtensions = true; //保留后缀

    console.log(" 0-1 is ok");
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    console.log(" 0-2 is ok");
    form.type = true;
    console.log(" 0-3 is ok");
    form.parse(req, function(err, fields, files) {
        
            console.log(" 0-4 is ok");

        if (err) {
            console.log(err);
            //req.flash('error','图片上传失败');
            return;
        }

        console.log(" 1 is ok");
        var file = files.postImg;//获取上传文件信息
                console.log(" 2 is ok");
        if(file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/gif' && file.type != 'image/jpg'){
            console.log('上传文件格式错误，只支持png,jpeg,gif');
          //  req.flash('error','上传文件格式错误，只支持png,jpeg,gif');
           // return res.redirect('/upload');
        }

            console.log(" 3 is ok");
        var title = fields.title;
        var author = req.session.user.name;
        var article = fields.article;
        var postImg = file.path.split(path.sep).pop();
        var pv = fields.pv;
        // 校验参数

            console.log(" 4 is ok");
        try {
            if (!title.length) {
                throw new Error('请填写标题');
            }
            if (!article.length) {
                throw new Error('请填写内容');
            }
        } catch (e) {
           // req.flash('error', e.message);
           console.log(" 5 is ok");
            return res.redirect('back');
        }
        var post = new postModel({
            title:title,
            author:author,
            article:article,
            postImg:postImg,
            pv:pv
        });

            console.log(" 6 is ok");
        post.save(function(err){
            if(err){
                console.log('文章发表出现错误');
               // req.flash('err','文章发表出现错误');
                return res.redirect('/post');
            }
            console.log('文章录入成功');
          //  req.flash('success','文章录入成功');
            res.redirect('/');
        });
    });


};


exports.detail =function(req,res){
  
  var id = req.query.id;
        if(id && id!=''){
            postModel.update({"_id":id},{$inc:{"pv":1}},function(err){
                if(err){
                    console.log(err);
                    return res.redirect("back");
                };
                console.log("浏览数量+1");
            });

            postModel.findById(id,function(err,post){
                if(err){
                    console.log('查看文章详细信息出错');
                   // req.flash('error','查看文章详细信息出错');
                    return res.redirect('/');
                }
                res.render('detail',{
                    title:'文章展示',
                    post: post,
                    img:path.join(process.cwd(),'/public/images/'+ post.postImg)
                })
            });
        }

};


exports.show_edit =function(req,res){

	var id = req.query.id;
        postModel.findById(id, function (err, data) {
            //console.log(data);
            if (err) {
                //req.flash('error', err);
                return res.redirect('back');
            }
            res.render('edit', {
                title: '编辑',
                post: data,
            });
        });
};

exports.edit_commit =function(req,res){
   
   var post = {
            id:req.body.id,
            author:req.session.user,
            title:req.body.title,
            article:req.body.article
        };

        console.log(post);

        //markdow转格式文章
        //post.article = markdown.toHTML(post.article);


        postModel.update({"_id":post.id},{$set:{title:post.title,article:post.article}},function(err){
            if(err){
                console.log(err);
                return;
            }
            console.log("更新成功");
            res.redirect("/");
        });

};


exports.delete =function(req,res){
      
      var id = req.query.id;
        console.log(id);
        if(id && id!=''){
            postModel.findByIdAndRemove(id,function(err){
                if(err){
                    console.log(err);
                   // req.flash("success","删除文章失败");
                    return req.redirect('/')
                }
               // req.flash("success","删除文章成功");
                res.redirect('/');
            })
        }
};


exports.commment_add =function(req,req) {
        
      //  var content= req.body.content;
       // var  postid= req.query.id;

        postModel.findById(id, function (err, data) {
            var addcomments = data.comments;
        });
       
         var i= addcomments.length;

         addcomments[i].name = "zhuhanmin1";
         addcomments[i].content="Good Yang";

        postModel.update({"_id": postid},{$set:{comments: addcomments}},function(err){
            if(err){
                console.log(err);
                return;
            }
            console.log("更新成功");
            res.redirect("/post/detail?id= postid");
        });
};