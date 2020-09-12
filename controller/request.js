var Request = require("../models/requests");

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