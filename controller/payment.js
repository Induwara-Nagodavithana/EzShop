var Payment = require("../models/payment");

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