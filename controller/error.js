var Error = require("../models/errors");

const Sequelize = require("sequelize");
var Accounts = require("../models/accounts");

module.exports.createError = function (newError, callback) {
    console.log("Create Error");
  
    Error.create(newError)
      .then((error1) => {
        callback(null, error1);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.updateError = function (id, newError, callback) {
    console.log("Update Error");
  
    // newUser.password = hash;
  
    Error.update(newError, {
      where: {
        id: id,
      },
    })
      .then((error1) => {
        callback(null, error1);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.getError = function (callback) {
    Error.findAll().then((error1) => {
      callback(null, error1);
    })
    .catch((err) => {
      callback(err);
    });
  };
   
  module.exports.deleteError = function (id, callback) {
    console.log("Delete Error Id");
  
    // newUser.password = hash;
  
    Error.destroy({
      where: {
        id: id
      }
    })
      .then((error1) => {
        callback(null, error1);
      })
      .catch((err) => {
        callback(err);
      });
  };

  module.exports.getErrorById = function (id, callback) {
    Error.findOne({
      where: {  id: id},
    }).then((error1) => {
      callback(null, error1);
    });
  };

  module.exports.getErrorByAccNo = function (accountNo, callback) {
    Accounts.findOne({
      where: {  accountNo: accountNo},
    }).then((accounts) => {
        Error.findOne({
      where: {  id: accounts.id},
    }).then((error1) => {
      callback(null, error1);
    });
  });
  };

  module.exports.getErrorByAccountId = function (accountId, callback) {
    Error.findAll({
      where: {  accountId: accountId},
      order: [['UpdatedAt', 'DESC'],]
    }).then((error1) => {
      callback(null, error1);
    });
  };

  module.exports.getErrorByDate = function (accountId,date, callback) {
    const Op = Sequelize.Op;
    console.log(date);
    Error.findAll({
      where: { 
        accountId: accountId,
        UpdatedAt: { [Op.startsWith]: date },
        

      },
    }).then((error1) => {
      callback(null, error1);
    });
  };

 

