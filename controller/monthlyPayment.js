const Sequelize = require("sequelize");
var Payment = require("../models/payment");
var Usage = require("../controller/usage");
var PriceDetail = require("../controller/priceDetail");






module.exports.createMonthlyPayment = function (date, callback) {
    console.log("Create Payment");

    var accId=1;
    var flag=0;
    // var datetime = new Date();
    //     console.log(datetime.toISOString().slice(0,7));

    var id = 1;
    var price;
  PriceDetail.getPriceDetailById(id, function(err, priceDetail){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(priceDetail);
      price=priceDetail;
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ priceDetail: priceDetail}));
    }
  });
    // for ( flag = 0; flag < 5; accId++,flag++) {
        var monthlyPay=0;
        Usage.getSumUsageByDate(accId,date, function(err, usage){
            if (err) {
              console.log("errors" + err.message);
              res.sendStatus(400);
              return;
            } else {
              console.log(usage);
              monthlyPay = usage*price;

              var newPayment = {
                paymentData: monthlyPay,
                accountId: accId
              };
            
              Payment.createPayment(newPayment, function (err, payment) {
                if (err) {
                  console.log("errors " + err.message);
                  res.sendStatus(400);
                  return;
                } else {
                  console.log(payment);
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ payment: payment}));
                }
              });


            //   res.setHeader("Content-Type", "application/json");
            //  // res.body(employee);
            //   res.end(JSON.stringify({ usage: usage}));
            }
          });
        
    // }
  
    
  };