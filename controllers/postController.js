const Post = require('../models/Post');
exports.viewCreatePost = function (req, res) {
    res.render("create-post");
}

exports.createPost = function (req, res) {
    let post = new Post(req.body, req.session.user._id);
    post.create().then(() => {
        res.send("New post created.");
    }).catch((errors) => {
        res.send(errors);
    });
};

exports.viewSinglePost = async function(req, res){
    Post.findSinglePostById(req.params.id).then(function(post){
        res.render("single-post", {post: post} );
    }).catch(function(){
        res.render("404");
    });
};
