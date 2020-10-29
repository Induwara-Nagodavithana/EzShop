const Sequelize = require("sequelize");
// var Payment = require("../controller/payment");
// var Usage = require("../controller/usage");
// var PriceDetail = require("../controller/priceDetail");

var Payment = require("../models/payment");
var Usage = require("../models/usage");
var PriceDetail = require("../models/priceDetail");





module.exports.createMonthlyPayment = function (date, callback) {
    console.log("Create Payment");

    // var accId = 1;
    // var flag = 0;
    // var datetime = new Date();
    //     console.log(datetime.toISOString().slice(0,7));

    var id = 1;
    var price;

    PriceDetail.findOne({
        where: { id: id },
    }).then((priceDetail) => {
        // callback(null, priceDetail);
        price = priceDetail.dataValues.price;
        const Op = Sequelize.Op;
        console.log(date);
        // for (let flag = 0; flag < 10; accId++) {
            for (let accId = 1; accId < 9; accId++) {
            Usage.sum('usageData', {
                where: {
                    accountId: accId,
                    UpdatedAt: { [Op.startsWith]: date },
                },
            }).then((usage) => {
                // if (usage==0) {
                //     flag++;
                // }else{
                //     //   callback(null, usage);
                //     flag=0;
                console.log("Payment Start");
                console.log(price);
                console.log(usage);
                var monthlyPay = usage * price;
                monthlyPay=monthlyPay.toFixed(2)
                console.log(monthlyPay);
                console.log("Payment xvcv");
    
                var newPayment = {
                    paymentData: monthlyPay,
                    accountId: accId
                };
    
                Payment.create(newPayment)
                    .then((payment) => {
                        console.log(payment);
                        // callback(null, payment);
                    })
                    .catch((err) => {
                        callback(err);
                    });
                // }
                
            });  
        }
        var myJson = {'key':'Done'};
        callback(null, myJson);

    });

}




// module.exports.createMonthlyPayment = function (date, callback) {
//     console.log("Create Payment");

//     var accId=1;
//     var flag=0;
//     // var datetime = new Date();
//     //     console.log(datetime.toISOString().slice(0,7));

//     var id = 1;
//     var price;

//     getPaymentDone;

//     async function getPaymentDone(){
//          price = await getPriceDetails;
//         getPayment;
//     }

//      function getPriceDetails(){
//         PriceDetail.getPriceDetailById(id, function(err, priceDetail){
//             if (err) {
//               console.log("errors" + err.message);
//               callback(err);
//             //   res.sendStatus(400);
//               return;
//             } else {
//                 console.log("Start");
//               console.log(priceDetail);
//               console.log("12312312dgd");
//               console.log(priceDetail.dataValues);
//               console.log("12312312dgd");
//               console.log(priceDetail.dataValues.price);
//               console.log("Finish");
//             //   price=priceDetail.dataValues.price;
//               return priceDetail.dataValues.price;
//             //   res.setHeader("Content-Type", "application/json");
//             //  // res.body(employee);
//             //   res.end(JSON.stringify({ priceDetail: priceDetail}));
//             }
//           });
//     }


//     function getPayment(){
//         // for ( flag = 0; flag < 5; accId++,flag++) {
//             var monthlyPay=0;
//             Usage.getSumUsageByDate(accId,date, function(err, usage){
//                 if (err) {
//                   console.log("errors" + err.message);
//                   callback(err);
//                 //   res.sendStatus(400);
//                   return;
//                 } else {
//                     console.log("Payment Start");
//                     console.log(price);
//                   console.log(usage);
//                   monthlyPay = usage*price;
//                   console.log(monthlyPay);
//                   console.log("Payment xvcv");

//                   var newPayment = {
//                     paymentData: monthlyPay,
//                     accountId: accId
//                   };

//                   Payment.createPayment(newPayment, function (err, payment) {
//                     if (err) {
//                       console.log("errors " + err.message);
//                       callback(err);
//                     //   res.sendStatus(400);
//                       return;
//                     } else {
//                       console.log(payment);
//                       callback(null, payment);
//                     //   res.setHeader("Content-Type", "application/json");
//                     //   res.end(JSON.stringify({ payment: payment}));
//                     }
//                   });


//                 //   res.setHeader("Content-Type", "application/json");
//                 //  // res.body(employee);
//                 //   res.end(JSON.stringify({ usage: usage}));
//                 }
//               });

//         // }
//     }


//   };


// module.exports.createMonthlyPayment = function (date, callback) {
//     console.log("Create Payment");

//     var accId=1;
//     var flag=0;
//     // var datetime = new Date();
//     //     console.log(datetime.toISOString().slice(0,7));

//     var id = 1;
//     var price;
//    PriceDetail.getPriceDetailById(id, function(err, priceDetail){
//     if (err) {
//       console.log("errors" + err.message);
//       callback(err);
//     //   res.sendStatus(400);
//       return;
//     } else {
//         console.log("Start");
//       console.log(priceDetail);
//       console.log("12312312dgd");
//       console.log(priceDetail.dataValues);
//       console.log("12312312dgd");
//       console.log(priceDetail.dataValues.price);
//       console.log("Finish");
//       price=priceDetail.dataValues.price;
//     //   res.setHeader("Content-Type", "application/json");
//     //  // res.body(employee);
//     //   res.end(JSON.stringify({ priceDetail: priceDetail}));
//     }
//   }).then((price) => {
//        // for ( flag = 0; flag < 5; accId++,flag++) {
//         var monthlyPay=0;
//         Usage.getSumUsageByDate(accId,date, function(err, usage){
//             if (err) {
//               console.log("errors" + err.message);
//               callback(err);
//             //   res.sendStatus(400);
//               return;
//             } else {
//                 console.log("Payment Start");
//                 console.log(price);
//               console.log(usage);
//               monthlyPay = usage*price;
//               console.log(monthlyPay);
//               console.log("Payment xvcv");

//               var newPayment = {
//                 paymentData: monthlyPay,
//                 accountId: accId
//               };

//               Payment.createPayment(newPayment, function (err, payment) {
//                 if (err) {
//                   console.log("errors " + err.message);
//                   callback(err);
//                 //   res.sendStatus(400);
//                   return;
//                 } else {
//                   console.log(payment);
//                   callback(null, payment);
//                 //   res.setHeader("Content-Type", "application/json");
//                 //   res.end(JSON.stringify({ payment: payment}));
//                 }
//               });


//             //   res.setHeader("Content-Type", "application/json");
//             //  // res.body(employee);
//             //   res.end(JSON.stringify({ usage: usage}));
//             }
//           });

//     // }
//         }).catch((err) => {
//             callback(err);
//           });




//   };