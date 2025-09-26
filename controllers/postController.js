const Post = require('../models/Post');
exports.viewCreatePost = function (req, res) {
    res.render("create-post");
}

exports.createPost = function (req, res) {
    let post = new Post(req.body, req.session.user._id);
    post.create().then(() => {
        res.redirect(`/profile/${req.session.user.username}`)
    }).catch((errors) => {
        res.send(errors);
    });
};

exports.viewSinglePost = async function(req, res){
    Post.findSinglePostById(req.params.id).then(function(post){
        res.render("single-post", {post: post, user: req.session.user} );
    }).catch(function(){
        res.render("404");
    });
};
    
exports.editPost = function(req, res){
    Post.findSinglePostById(req.params.id).then(function(post){
        if(post.author._id == req.session.user._id){
            Post.findOneAndUpdate({_id: post._id}, {title: req.body.title, body: req.body.body}).then(function(){
                res.redirect(`/post/${post._id}`);
            }).catch(function(){
                res.render("404");
            });
        }else{
            res.send("Зөвшөөрөлгүй хандахыг завдлаа.");
        }
    }).catch(function(){
        res.render("404");
    });
}

exports.deletePost = function(req, res){
    Post.findSinglePostById(req.params.id).then(function(post){
        if(post.author._id == req.session.user._id){
            Post.deleteOne({_id: post._id}).then(function(){
                res.redirect(`/profile/${req.session.user.username}`);
            }).catch(function(){
                res.render("404");
            });
        }else{
            res.send("Зөвшөөрөлгүй хандахыг завдлаа.");
        }
    }).catch(function(){
        res.render("404");
    });
}

exports.viewEditScreen = function(req, res){
    Post.findSinglePostById(req.params.id)
        .then(function(post){
            if(post.author._id == req.session.user._id){
                res.render("edit-post", {post: post});
            }else{
                res.send("Зөвшөөрөлгүй хандахыг завдлаа.");
            }
        })
        .catch(function(e){
            res.render("404");
        })
}