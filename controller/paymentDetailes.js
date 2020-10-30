var PaymentDetailes = require("../models/paymentDetailes");


module.exports.createPaymentDetailes = function (newPaymentDetailes, callback) {
    console.log("Create PaymentDetailes");
  
    PaymentDetailes.create(newPaymentDetailes)
      .then((paymentDetailes) => {
        callback(null, paymentDetailes);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.getPaymentDetailes = function (callback) {
    PaymentDetailes.findAll().then((paymentDetailes) => {
      callback(null, paymentDetailes);
    })
    .catch((err) => {
      callback(err);
    });
  };
   
 

  module.exports.getPaymentDetailesByDate = function (date, callback) {
    PaymentDetailes.findOne({
      where: {  Date: date},
    }).then((paymentDetailes) => {
      callback(null, paymentDetailes);
    });
  };