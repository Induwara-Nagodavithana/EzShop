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



    const { Op } = require("sequelize");
    var list = [];
    var flag = 0;
    var Counts;
    var AllCounts;
    var usageCounts;
    var usageList = [];

    for (let index = 1; index < 13; index++) {
        var str = "" + index
        var pad = "00"
        var ans = pad.substring(0, pad.length - str.length) + str
        Usage.sum('usageData', {
            where: {
                UpdatedAt: { [Op.startsWith]: "2020-" + ans },
            }
        }).then((usage) => {
            usageList[index - 1] = usage
        });
    }

    Accounts.count({
        distinct: true,
    }).then((countAccAll) => {

        Requests.count({
            distinct: true,
        }).then((countReqAll) => {
            Accounts.count({
                distinct: true,
            }).then((countAccBalanceAll) => {
                console.log("countAccAll is = ");
                console.log(countAccAll);
                console.log("countReqAll is = ");
                console.log(countReqAll);
                console.log("countAccBalanceAll is = ");
                console.log(countAccBalanceAll);

                AllCounts = {
                    'countAccAll': countAccAll,
                    'countReqAll': countReqAll,
                    'countAccBalanceAll': countAccBalanceAll,
                };

                var myJson2 = {
                    AllCounts,
                    Counts
                };
                // callback(null, myJson2);

            });
        });
    });






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
                        list[i] = payment;
                        if (payment >= 0) {
                            flag++;
                        }
                        console.log("flag");
                        console.log(flag);


                    });

                }
                console.log("Payment List Checking Start");
                Accounts.findOne({
                    where: { accountNo: 1 },
                }).then((accounts) => {
                    Counts = {
                        'countAcc': countAcc,
                        'countReq': countReq,
                        'countAccBalance': flag,

                    };
                    usageCounts = {
                        'Jan': usageList[0],
                        'Feb': usageList[1],
                        'Mar': usageList[2],
                        'Apr': usageList[3],
                        'May': usageList[4],
                        'Jun': usageList[5],
                        'Jul': usageList[6],
                        'Aug': usageList[7],
                        'Sep': usageList[8],
                        'Oct': usageList[9],
                        'Nov': usageList[10],
                        'Dec': usageList[11],

                    };
                    var myJson2 = {
                        AllCounts,
                        Counts,
                        usageCounts
                    };
                    callback(null, myJson2);
                });
                console.log("Payment List Checking End");
            });

            // Counts = {
            //     'countAcc': countAcc,
            //     'countReq': countReq,
            //     'countAccBalance': flag,

            // };
            // callback(null, myJson);
        });
    });
    // });



}


