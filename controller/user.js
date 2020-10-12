const bcrypt = require("bcryptjs");
const saltRounds = 5;
var User = require("../models/user");

// module.exports.getUserById = function (id, callback) {
//   User.findOne({
//     where: { id: id, status: "Active" },
//   }).then((user) => {
//     callback(null, user);
//   });
// };
module.exports.createUser = function (newUser, callback) {
  console.log("Create user");
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
  User.create(newUser)
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    });
  });
});
};

module.exports.getUsers = function (callback) {
  User.findAll().then((user) => {
    callback(null, user);
  })
  .catch((err) => {
    callback(err);
  });
};

module.exports.getUserById = function (id, callback) {
  User.findOne({
    where: { id: id},
  }).then((user) => {
    callback(null, user);
  });
};

module.exports.getUserByNic = function (nic, callback) {
  User.findOne({
    where: { nic: nic},
  }).then((user) => {
    callback(null, user);
  });
};

module.exports.updateUser = function (id, newUser, callback) {
  console.log("Update user");
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
  // newUser.password = hash;

  User.update(newUser, {
    where: {
      id: id,
    },
  })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    });
  });
});
};

module.exports.deleteUser = function (id, callback) {
  console.log("Delete user");

  // newUser.password = hash;

  User.destroy({
    where: {
      id: id
    }
  })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, res) {
    if (err) throw err;
    //console.log(err+" "+candidatePassword+" "+res+" "+hash)
    callback(null, res);
  });
};
