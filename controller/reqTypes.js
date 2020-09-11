var ReqType = require("../models/reqTypes");

module.exports.createReqType = function (newReqType, callback) {
    console.log("Create Request Type");
  
    ReqType.create(newReqType)
      .then((reqType) => {
        callback(null, reqType);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.getReqTypes = function (callback) {
    ReqType.findAll().then((reqType) => {
      callback(null, reqType);
    })
    .catch((err) => {
      callback(err);
    });
  };
   
  module.exports.deleteReqType = function (id, callback) {
    console.log("Delete Request Type");
  
    // newUser.password = hash;
  
    ReqType.destroy({
      where: {
        id: id
      }
    })
      .then((reqType) => {
        callback(null, reqType);
      })
      .catch((err) => {
        callback(err);
      });
  };

  module.exports.getReqTypeByName = function (type, callback) {
    ReqType.findOne({
      where: {  Type: type},
    }).then((reqType) => {
      callback(null, reqType);
    });
  };