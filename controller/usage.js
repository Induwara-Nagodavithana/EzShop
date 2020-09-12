var Usage = require("../models/usage");


  module.exports.createUsage = function (newUsage, callback) {
    console.log("Create Usage");
  
    Usage.create(newUsage)
      .then((usage) => {
        callback(null, usage);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.getUsage = function (callback) {
    Usage.findAll().then((usage) => {
      callback(null, usage);
    })
    .catch((err) => {
      callback(err);
    });
  };
  
  module.exports.getUsageById = function (id, callback) {
    Usage.findOne({
      where: { id: id},
    }).then((usage) => {
      callback(null, usage);
    });
  };
  
  module.exports.updateUsage = function (id, newUsage, callback) {
    console.log("Update Usage");
  
    // newUser.password = hash;
  
    Usage.update(newUsage, {
      where: {
        id: id,
      },
    })
      .then((usage) => {
        callback(null, usage);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.deleteUsage = function (id, callback) {
    console.log("Delete Usage");
  
    // newUser.password = hash;
  
    Usage.destroy({
      where: {
        id: id
      }
    })
      .then((usage) => {
        callback(null, usage);
      })
      .catch((err) => {
        callback(err);
      });
  };
  