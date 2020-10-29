const Sequelize = require("sequelize");
var Payment = require("../models/payment");
var Usage = require("../controller/usage");






module.exports.createMonthlyPayment = function (date, callback) {
    console.log("Create Payment");

    var accId=1;
    var flag=0;
    // var datetime = new Date();
    //     console.log(datetime.toISOString().slice(0,7));
    // for ( flag = 0; flag < 5; accId++,flag++) {
        Usage.getSumUsageByDate(accId,date, function(err, usage){
            if (err) {
              console.log("errors" + err.message);
              res.sendStatus(400);
              return;
            } else {
              console.log(usage);
              console.log('1ff');
            //   console.log(usage.store_config);
            //   console.log('2fgh');
            //   console.log(usage.store_config[0]);
              console.log('3fgh');
              console.log(usage);
              console.log('4fgh');
              res.setHeader("Content-Type", "application/json");
             // res.body(employee);
              res.end(JSON.stringify({ usage: usage}));
            }
          });
        
    // }
  
    // Payment.create(newPayment)
    //   .then((payment) => {
    //     callback(null, payment);
    //   })
    //   .catch((err) => {
    //     callback(err);
    //   });
  };