const Sequelize = require("sequelize");
// var Payment = require("../controller/payment");
// var Usage = require("../controller/usage");
// var PriceDetail = require("../controller/priceDetail");


var Payment = require("../models/payment");
var Usage = require("../models/usage");
var PriceDetail = require("../models/priceDetail");
var Accounts = require("../models/accounts");
var Requests = require("../models/requests");





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
        console.log(date);
        const Op = Sequelize.Op;

        Accounts.findAll().then((accounts) => {

            //   callback(null, accounts);
            // for (let flag = 0; flag < 10; accId++) {
            console.log("Accounts Finding Start");
            console.log(accounts[0]);
            console.log("fdsfdfg");
            console.log(accounts[0].id);
            for (let i = 0; i < accounts.length; i++) {
                Usage.sum('usageData', {
                    where: {
                        accountId: accounts[i].id,
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
                    monthlyPay = monthlyPay.toFixed(2)
                    console.log(monthlyPay);
                    console.log("Payment xvcv");

                    var newPayment = {
                        paymentData: -monthlyPay,
                        accountId: accounts[i].id
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
        });

        var myJson = { 'key': 'Done' };
        callback(null, myJson);

    });

}


module.exports.LandingDetailes = function (callback) {
    console.log("Create Detailes");

    // var accId = 1;
    // var flag = 0;
    // var datetime = new Date();
    //     console.log(datetime.toISOString().slice(0,7));

    
    const { Op } = require("sequelize");
    var list = [];
    var flag=0;

    Accounts.count({
        where: { isConnected: 1 },
        distinct: true,
    }).then((countAcc) => {
        console.log("count is = ");
        console.log(countAcc);
        Requests.count({
            where: { isPending: 1 },
            distinct: true,
        }).then((countReq) => {
            Accounts.findAll().then((accounts) => {

                //   callback(null, accounts);
                // for (let flag = 0; flag < 10; accId++) {
                console.log("Accounts Finding Start");
                console.log(accounts[0]);
                console.log("fdsfdfg");
                console.log(accounts[0].id);
                
                for (let i = 0; i < accounts.length; i++) {
                    Payment.sum('paymentData', {
                        where: {
                            accountId: accounts[i].id,
                        }

                    }).then((payment) => {
                        console.log("Payment List");
                console.log(payment);
                        list.push(payment);
                    });
                }
            });

                        list.forEach(element => {
                            console.log("Payment List Checking");
                console.log(element);
                            if (element>=0) {
                                flag++;
                            }
                        });
            // 
                        var myJson = {
                            'countAcc': countAcc,
                            'countReq': countReq,
                            'countAccBalance': flag,

                        };
                        callback(null, myJson);
                    });
                });
        // });

        Accounts.count({
            // where: { isConnected: 1 },
            distinct: true,
        }).then((countAccAll) => {

            Requests.count({
                // where: { isPending: 1 },
                distinct: true,
            }).then((countReqAll) => {
                Accounts.count({
                    // where: {  
                    //     accountNo: {
                    //         [Op.gte]: 0,
                    //     }
                    // },
                    distinct: true,
                }).then((countAccBalanceAll) => {
                    //     var myJson = {
                    //         'countAcc':countAccAll,
                    //         'countReq':countReqAll,
                    //         'countAccBalance':countAccBalanceAll,

                    // };
                    // callback(null, myJson);
                    console.log("countAccAll is = ");
                    console.log(countAccAll);
                    console.log("countReqAll is = ");
                    console.log(countReqAll);
                    console.log("countAccBalanceAll is = ");
                    console.log(countAccBalanceAll);

                });
            });
        });
    // });
        // PriceDetail.findOne({
        //     where: { isPending: 1 },
        // }).then((priceDetail) => {
        //     // callback(null, priceDetail);
        //     price = priceDetail.dataValues.price;
        //     console.log(date);
        //     const Op = Sequelize.Op;

        //     Accounts.findAll().then((accounts) => {

        //     //   callback(null, accounts);
        //     // for (let flag = 0; flag < 10; accId++) {
        //         console.log("Accounts Finding Start");
        //                 console.log(accounts[0]);
        //                 console.log("fdsfdfg");
        //                 console.log(accounts[0].id);
        //         for (let i = 0; i < accounts.length; i++) {
        //             Usage.sum('usageData', {
        //                 where: {
        //                     accountId: accounts[i].id,
        //                     UpdatedAt: { [Op.startsWith]: date },
        //                 },
        //             }).then((usage) => {
        //                 // if (usage==0) {
        //                 //     flag++;
        //                 // }else{
        //                 //     //   callback(null, usage);
        //                 //     flag=0;
        //                 console.log("Payment Start");
        //                 console.log(price);
        //                 console.log(usage);
        //                 var monthlyPay = usage * price;
        //                 monthlyPay=monthlyPay.toFixed(2)
        //                 console.log(monthlyPay);
        //                 console.log("Payment xvcv");

        //                 var newPayment = {
        //                     paymentData: -monthlyPay,
        //                     accountId: accounts[i].id
        //                 };

        //                 Payment.create(newPayment)
        //                     .then((payment) => {
        //                         console.log(payment);
        //                         // callback(null, payment);
        //                     })
        //                     .catch((err) => {
        //                         callback(err);
        //                     });
        //                 // }

        //             });  
        //         }
        //     });

        //     var myJson = {'key':'Done'};
        //     callback(null, myJson);

        // });

    }


