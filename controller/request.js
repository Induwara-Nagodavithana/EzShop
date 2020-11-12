var Request = require("../models/requests");

const Sequelize = require("sequelize");

module.exports.createRequest = function (newRequest, callback) {
    console.log("Create Payment");
  
    Request.create(newRequest)
      .then((request) => {
        callback(null, request);
      })
      .catch((err) => {
        callback(err);
      });
  };

  module.exports.getRequest = function (callback) {
    Request.findAll().then((request) => {
      callback(null, request);
    })
    .catch((err) => {
      callback(err);
    });
  };
   
  module.exports.deleteRequest = function (id, callback) {
    console.log("Delete Request Id");
  
    // newUser.password = hash;
  
    Request.destroy({
      where: {
        id: id
      }
    })
      .then((request) => {
        callback(null, request);
      })
      .catch((err) => {
        callback(err);
      });
  };

  module.exports.getRequestById = function (id, callback) {
    Request.findOne({
      where: {  id: id},
    }).then((request) => {
      callback(null, request);
    });
  };

  module.exports.getRequestByAccountId = function (accountId, callback) {
    Request.findAll({
      where: { accountId: accountId},
      order: [['UpdatedAt', 'DESC'],]
    }).then((request) => {
      callback(null, request);
    });
  };

  module.exports.getLatestRequestByAccountId = function (accountId, callback) {
    const Op = Sequelize.Op;
    Request.max('id',{
      where: { accountId: accountId},
      
}).then((request) => {
      callback(null, request);
    });
  };

  module.exports.updateRequest = function (id, newRequest, callback) {
    console.log("Update Request");
  
    // newUser.password = hash;
  
    Request.update(newRequest, {
      where: {
        id: id,
      },
    })
      .then((request) => {
        callback(null, request);
      })
      .catch((err) => {
        callback(err);
      });
  };

//   module.exports.getLatestRequestByAccountId = function (accountId, callback) {
//     const Op = Sequelize.Op;
//     Request.max('id',{
//       where: { accountId: accountId},
      
// }).then((request) => {
//       callback(null, request);
//     });
//   };