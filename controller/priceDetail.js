var PriceDetail = require("../models/priceDetail");

module.exports.createPriceDetail = function (newPriceDetail, callback) {
    console.log("Create Request Type");
  
    PriceDetail.create(newPriceDetail)
      .then((priceDetail) => {
        callback(null, priceDetail);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.getPriceDetails = function (callback) {
    PriceDetail.findAll().then((priceDetail) => {
      callback(null, priceDetail);
    })
    .catch((err) => {
      callback(err);
    });
  };
   
  module.exports.deletePriceDetail = function (id, callback) {
    console.log("Delete Price Detail Type");
  
    // newUser.password = hash;
  
    PriceDetail.destroy({
      where: {
        id: id
      }
    })
      .then((priceDetail) => {
        callback(null, priceDetail);
      })
      .catch((err) => {
        callback(err);
      });
  };

  module.exports.getPriceDetailById = function (id, callback) {
    PriceDetail.findOne({
      where: {  id: id},
    }).then((priceDetail) => {
      callback(null, priceDetail);
    });
  };