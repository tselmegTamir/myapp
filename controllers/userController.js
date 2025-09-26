let User = require("../models/User");
let Post = require("../models/Post");

exports.checkLogin = function (req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        req.flash("errors", "Та эхлээд нэвтэрнэ үү.");
        req.session.save(function () {
            res.redirect("/");
        });
    }
};

exports.home = function (req, res) {
    if (req.session.user) {
        res.render("home-dashboard");
        return;
    }
    res.render("home-guest", { errors: req.flash("errors") });
};

exports.register = function (req, res) {
    let user = new User(req.body);
    user.register()
    .then(() => {
        req.session.user = {username: user.data.username};
        req.session.save(function(){
            res.redirect("/");
        });
    })
    .catch((errors) => {
        req.flash("errors", errors);
        req.session.save(function(){
            res.redirect("/"); // redirect хийхдээ session хадгалаад дараа нь redirect хийх хэрэгтэй.
        });
    });
};

exports.login = function (req, res) {
    let user = new User(req.body);
    user
    .login()
    .then(function (result) {
        req.session.user = { username: user.data.username, _id: user._id };
        // Session үүсгэхдээ асинхрон үйлдэл учраас хадгалаад дараа нь redirect хийх хэрэгтэй.
        req.session.save(function () {
            res.redirect("/");
        });
    })
    .catch(function (err) {
        req.flash("errors", err);
        req.session.save(function () {
            res.redirect("/");
        });
    });
};

exports.logout = function(req, res){
    req.session.destroy(function(){
        res.redirect("/");
    });
};

exports.viewProfile = function(req, res){

    Post.findPostsByAuthorId(req.profileUser._id)
        .then(function(posts){
            res.render("profile-posts", {profileUser: req.profileUser.username, posts: posts});
        })
        .catch(function(e){
            res.send(e);
        })
};

exports.checkUserExists = function(req, res, next){
    User.findByUsername(req.params.username)
    .then(function(userDocument){
        req.profileUser = userDocument;
        next();
    }).catch(function(){
        res.render("404");
    });
}