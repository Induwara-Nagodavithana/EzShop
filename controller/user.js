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

  User.create(newUser)
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
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

module.exports.updateUser = function (id, newUser, callback) {
  console.log("Update user");

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
