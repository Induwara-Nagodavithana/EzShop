const bcrypt = require("bcryptjs");
const saltRounds = 5;
var User = require("../models/user");

// module.exports.createUser = function (newUser, callback) {
//     console.log("Create user");
//     bcrypt.genSalt(saltRounds, function (err, salt) {
//       bcrypt.hash(newUser.password, salt, function (err, hash) {
//         newUser.password = hash;
//     User.create(newUser)
//       .then((user) => {
//         callback(null, user);
//       })
//       .catch((err) => {
//         callback(err);
//       });
//     });
//   });
//   };

  module.exports.createUser = function (newUser, callback) {
    console.log("Create user");
    
  
  const user = new User(newUser);
  
    // const a1 = await user.save();
    console.log(newUser);
    // res.json(a1);
    user.save()
    .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      }); 
  };

  module.exports.updateUser = function (id,newUser, callback) {
    console.log("Update user");
    
    User.findOneAndUpdate({_id :id}, newUser)
    .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      }); 
  };

  module.exports.deleteUser = function (id, callback) {
    console.log("Delete user");
    
    User.findByIdAndRemove(id)
    .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      }); 
  };

  module.exports.findAllUser = function (callback) {
    console.log("find All user");
    
    User.find()
    .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      }); 
  };

  module.exports.findOneUser = function (id, callback) {
    console.log("find One user");
    
    User.findById(id)
    .then((user) => {
        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      }); 
  };