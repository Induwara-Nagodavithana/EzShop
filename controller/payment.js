var Payment = require("../models/payment");

const Sequelize = require("sequelize");

module.exports.createPayment = function (newPayment, callback) {
    console.log("Create Payment");
  
    Payment.create(newPayment)
      .then((payment) => {
        callback(null, payment);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.updatePayment = function (id, newPayment, callback) {
    console.log("Update Payment");
  
    // newUser.password = hash;
  
    Payment.update(newPayment, {
      where: {
        id: id,
      },
    })
      .then((payment) => {
        callback(null, payment);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.getPayment = function (callback) {
    Payment.findAll().then((payment) => {
      callback(null, payment);
    })
    .catch((err) => {
      callback(err);
    });
  };
   
  module.exports.deletePayment = function (id, callback) {
    console.log("Delete Payment Id");
  
    // newUser.password = hash;
  
    Payment.destroy({
      where: {
        id: id
      }
    })
      .then((payment) => {
        callback(null, payment);
      })
      .catch((err) => {
        callback(err);
      });
  };

  module.exports.getPaymentById = function (id, callback) {
    Payment.findOne({
      where: {  id: id},
    }).then((payment) => {
      callback(null, payment);
    });
  };

  module.exports.getPaymentByAccountId = function (accountId, callback) {
    Payment.findAll({
      where: {  accountId: accountId},
      order: [['UpdatedAt', 'DESC'],]
    }).then((payment) => {
      callback(null, payment);
    });
  };

  module.exports.getPaymentByDate = function (accountId,date, callback) {
    const Op = Sequelize.Op;
    console.log(date);
    Payment.findAll({
      where: { 
        accountId: accountId,
        UpdatedAt: { [Op.startsWith]: date },
        

      },
    }).then((payment) => {
      callback(null, payment);
    });
  };

  module.exports.getSumPaymentByDate = function (accountId,date, callback) {
    const Op = Sequelize.Op;
    console.log(date);
    Payment.sum('paymentData',{
      where: { 
        accountId: accountId,
        UpdatedAt: { [Op.startsWith]: date },
      },
    }).then((payment) => {
      callback(null, payment);
    });
  };

  module.exports.getSumPayment = function (accountId, callback) {
    Payment.sum('paymentData',{
      where: { 
        accountId: accountId,
      }   
    }).then((payment) => {
      callback(null, payment);
    });
  };