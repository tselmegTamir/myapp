const validator = require("validator");
const bcrypt = require("bcryptjs");
const usersCollection = require("../db").collection("users");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.login = async function () {
  return new Promise(async (resolve, reject) => {
    let loginUser = await usersCollection.findOne({
      username: this.data.username,
    });

    if (
      loginUser &&
      bcrypt.compareSync(this.data.password, loginUser.password)
    ) {
      console.log("Login user in the User Model:", loginUser);
      this._id = loginUser._id;
      resolve("Congratulations! Login success");
    } else {
      reject("Invalid username or password");
    }
  });
};

// User.prototype.login = async function (callback) {
//     let loginUser = await usersCollection.findOne({username: this.data.username})

//     if(loginUser && loginUser.password == this.data.password){
//         callback("Login success");
//     }else{
//         callback("Login failed");
//     }
// }

User.prototype.validate = async function () {
    return new Promise(async (resolve, reject) => {
        if (!this.data.username) this.errors.push("Та нэрээ бичнэ үү.");
        if (this.data.username && !validator.isAlphanumeric(this.data.username))
            this.errors.push("Нэр зөвхөн үсэг тооноос тогтож болно.");
        if (this.data.username) {
            let user = await usersCollection.findOne({ username: this.data.username });
            console.log("user document:", user);
            if (user) this.errors.push("Таны оруулсан нэр бүртгэлтэй байна.");
        }

        if (!this.data.email) this.errors.push("Та имэйлээ бичнэ үү.");
        if (this.data.email && !validator.isEmail(this.data.email))
            this.errors.push("Таны имэйл буруу байна.");
        if (this.data.email) {
            let email = await usersCollection.findOne({ email: this.data.email });
            console.log("email query user document:", email);
            if (email) this.errors.push("Таны оруулсан имэйл бүртгэлтэй байна.");
        }

        if (!this.data.password) this.errors.push("Нууц үгээ оруулна уу.");
        resolve();
    });
};

User.prototype.register = async function () {
    return new Promise(async (resolve, reject) => {
        await this.validate();
        if (!this.errors.length) {
            let salt = bcrypt.genSaltSync(10);
            this.data.password = bcrypt.hashSync(this.data.password, salt);
            await usersCollection.insertOne(this.data);
            resolve();
        } else {
            reject(this.errors);
        }
    });
};

User.findByUsername = function(username){
    return new Promise(function(resolve, reject){
        if(typeof username != "string"){
            reject();
            return;
        }

        usersCollection
          .findOne({ username })
          .then(function(userDoc){
            if(userDoc){
              resolve(userDoc);
            }else{
              reject();
            }
          })
          .catch(function(){
            reject();
          });
    });
};

module.exports = User;
