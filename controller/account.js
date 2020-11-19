var Accounts = require("../models/accounts");

module.exports.createAccounts = function (newAccounts, callback) {
    console.log("Create Accounts");
  
    Accounts.create(newAccounts)
      .then((accounts) => {
        callback(null, accounts);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.updateAccounts = function (id, newAccounts, callback) {
    console.log("Update Accounts");
  
    // newUser.password = hash;
  
    Accounts.update(newAccounts, {
      where: {
        id: id,
      },
    })
      .then((accounts) => {
        callback(null, accounts);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.getAccounts = function (callback) {
    Accounts.findAll().then((accounts) => {
      callback(null, accounts);
    })
    .catch((err) => {
      callback(err);
    });
  };
   
  module.exports.deleteAccounts = function (id, callback) {
    console.log("Delete Account Id");
  
    // newUser.password = hash;
  
    Accounts.destroy({
      where: {
        id: id
      }
    })
      .then((accounts) => {
        callback(null, accounts);
      })
      .catch((err) => {
        callback(err);
      });
  };

  module.exports.getAccountsById = function (id, callback) {
    Accounts.findOne({
      where: {  id: id},
    }).then((accounts) => {
      callback(null, accounts);
    });
  };

  module.exports.getAccountsIsConnectedById = function (id, callback) {
    Accounts.findOne({
      where: {  id: id},
      include: ['isConnected']
    }).then((accounts) => {
      callback(null, accounts);
    });
  };

  module.exports.getAccountsByUserId = function (userid, callback) {
    Accounts.findAll({
      where: {  userid: userid},
    }).then((accounts) => {
      callback(null, accounts);
    });
  };
  
  module.exports.getOneAccountByUserId = function (userid, callback) {
    Accounts.findOne({
      where: {  userid: userid},
    }).then((accounts) => {
      callback(null, accounts);
    });
  };

  module.exports.getOneAccountByAccNo = function (accountNo, callback) {
    Accounts.findOne({
      where: {  accountNo: accountNo},
    }).then((accounts) => {
      callback(null, accounts);
    });
  };

  module.exports.getLatestAccountId = function (callback) {
    const Op = Sequelize.Op;
    Accounts.max('id').then((accounts) => {
      callback(null, accounts);
    });
  };