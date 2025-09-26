const { ObjectId } = require('mongodb');

const postsCollection = require('../db').collection("posts");

let Post = function(data, userid){
    this.data = data;
    this.errors = [];
    this.userid = userid;
}

Post.prototype.validate = function(){
    console.log("Validating");
    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        author: new ObjectId(this.userid),
        createDate: new Date()
    };
    if(this.data.title == ""){this.errors.push("Гарчиг хоосон байна.")}
    if(this.data.body == ""){this.errors.push("Бичлэгийн агуулга хоосон байна.")}
}

Post.prototype.create = function(){
    return new Promise((resolve, reject) => {
        this.validate();
        if(this.errors.length) {
            reject(this.errors);
        } else {
            postsCollection.insertOne(this.data).then(() => {
                resolve();
            }).catch(() => {
                this.errors.push("DB алдаа гарлаа, дахин оролдоно уу.");
                reject(this.errors);
            });
        }
    });
}

function getAuthorPipeline() {
    return [
        {
        $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorDocument",
        },
        },
        {
        $project: {
            title: 1,
            body: 1,
            createDate: 1,
            author: { $arrayElemAt: ["$authorDocument", 0] },
        },
        },
    ];
}
    
Post.findSinglePostById = function(id){
    return new Promise(async (resolve, reject) => {
        try{
            let posts = await postsCollection.aggregate([
                {$match: {_id: new ObjectId(id)}},
                ...getAuthorPipeline(),
            ]).toArray();

            if(posts.length){
                resolve(posts[0]);
            } else {
                reject("Post not found");
            }
        } catch(e){
            reject("DB error");
        }
    });
}

Post.findPostsByAuthorId = function(authorId){
    return new Promise(async (resolve, reject) => {
        try{
            let posts = await postsCollection.aggregate([
                {$match: {author: new ObjectId(authorId)}},
                {$sort: {createDate: -1}},
                ...getAuthorPipeline(),
            ]).toArray();

            console.log("POSTS FROM THE DB", posts);

            if(posts.length){
                resolve(posts);
            } else {
                reject("Posts not found");
            }
        } catch(e){
            reject("DB error");
        }
    });
}

Post.findOneAndUpdate = function(filter, update){
    return new Promise(async (resolve, reject) => {
        try{
            await postsCollection.updateOne(
                { _id: new ObjectId(filter._id) },
                { $set: update }
            );
            resolve();
        } catch(e){
            reject("DB Update error");
        }
    });
}

Post.deleteOne = function(filter){
    return new Promise(async (resolve, reject) => {
        try{
            await postsCollection.deleteOne({ _id: new ObjectId(filter._id) });
            resolve();
        } catch(e){
            reject("DB Delete error");
        }
    });
}

module.exports = Post;