var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser')
var User = require("../controller/user");
var Employee = require("../controller/employee");
var EType = require("../controller/eTypes");
var Payment = require("../controller/payment");
var PriceDetail = require("../controller/priceDetail");
var ReqType = require("../controller/reqTypes");
var Request = require("../controller/request");
var Usage = require("../controller/usage");
var Account = require("../controller/account");
var MonthlyPayment = require("../controller/monthlyPayment");
var PaymentDetailes = require("../controller/paymentDetailes");
var Error = require("../controller/error");
// var Center = require("../models/centers");
//var passport = require("passport");
const bcrypt = require("bcryptjs");
const saltRounds = 5;

var urlencodedParser = bodyParser.urlencoded({ extended: false })
// const passportJWTInit = require("./auth/passport_jwt");

router.get("/all", function (req, res) {
  res.send("Hello World from API. \n /getUsers \n /getOneUser \n /registerUser \n /updateUser \n /deleteUser \n /registerEmployee \n /updateEmployee \n /getEmployees \n /getOneEmployee \n /deleteEmployee \n ");
});




router.get("/getUsers", urlencodedParser, function (req, res) {
  User.getUsers(function(err, user){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ user: user}));
    }
  });
});

router.post("/getOneUser", urlencodedParser, function (req, res) {
  var id = req.body.id;
  User.getUserById(id, function(err, user){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ user: user}));
    }
  });
});

router.post("/getOneUserByNIC", urlencodedParser, function (req, res) {
  var nic = req.body.nic;
  User.getUserByNic(nic, function(err, user){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ user: user}));
    }
  });
});

router.post("/registerUser", urlencodedParser, function (req, res) {
  console.log("Register USer Start");
 // var username = req.body.username;
  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var address = req.body.address;
  var nic = req.body.nic;
  var tel = req.body.contactNo;
  var city = req.body.city;
  var province = req.body.province;
  var email = req.body.email;
  var image = req.body.image;
  var gender = req.body.gender;

  var newUser = {
    nic: nic,
    password: password,
    firstname: fname,
    lastname: lname,
    address: address,
    province: province,
    city: city,
    contactno: tel,
    email: email,
    image: image,
    gender:gender,
  };

  User.createUser(newUser, function (err, user) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ user: user}));
    }
  });
});

router.post("/updateUser", urlencodedParser, function (req, res) {
  console.log("User Updating");
 // var username = req.body.username;
 var id = req.body.id;
  var password = req.body.password;
 // var password2 = req.body.password2;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var address = req.body.address;
  var city = req.body.city;
  var province = req.body.province;
  var nic = req.body.nic;
  var tel = req.body.tel;
  var email = req.body.email;
  var image = req.body.image;
  var gender = req.body.gender;

  var newUser = {
    nic: nic,
    password: password,
    firstname: fname,
    lastname: lname,
    address: address,
    province: province,
    city: city,
    telno: tel,
    email: email,
    image: image,
    gender: gender,
  };

  User.updateUser(id,newUser, function (err, user) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ user: user}));
    }
  });
});


router.post("/updateUserPassAndEmail", urlencodedParser, function (req, res) {
  console.log("User Updating");
 // var username = req.body.username;
 var id = req.body.id;
  var password = req.body.password;
  var email = req.body.email;

  var newUser = {
    password: password,
    email: email
  };

  User.updateUser(id,newUser, function (err, user) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ user: user}));
    }
  });
});

router.post("/deleteUser", urlencodedParser, function (req, res) {
  console.log("User Deleting");
 var id = req.body.id;
  
  User.deleteUser(id, function (err, user) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ user: user}));
    }
  });
});




router.post("/registerAccount", urlencodedParser, function (req, res) {
  console.log("Register Account Start");
  
  var userId = req.body.userId;
  var accountNo = req.body.accountNo;
  var usageLimit = '500.00';
  var isConnected = req.body.isConnected;
  var address = req.body.address;
  var city = req.body.city;

  var newAccount = {
    accountNo: accountNo,
    usageLimit: usageLimit,
    isConnected: isConnected,
    userId: userId,
    address: address,
    city: city,
  };

  Account.createAccounts(newAccount, function (err, account) {
    if (err) {
      console.log("errors " + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ account: account}));
    }
  });
});


router.post("/updateAccount", urlencodedParser, function (req, res) {
  console.log("Update Account Start");
  var AccId = req.body.AccId;
  var accountNo = req.body.accountNo;
  var usageLimit = req.body.usageLimit;
  var isConnected = req.body.isConnected;
  var userId = req.body.userId;
  var address = req.body.address;
  var city = req.body.city;

  var newAccount = {
    accountNo: accountNo,
    usageLimit: usageLimit,
    isConnected: isConnected,
    userId: userId,
    address: address,
    city: city,
  };

  Account.updateAccounts(AccId,newAccount, function (err, account) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ account: account}));
    }
  });
});

router.get("/getAccount", urlencodedParser, function (req, res) {
  Account.getAccounts(function(err, account){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ account: account}));
    }
  });
});

router.post("/deleteAccount", urlencodedParser, function (req, res) {
  console.log("Account Deleting");
  
  var AccId = req.body.AccId;
  
  Account.deleteAccounts(AccId, function (err, account) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ account: account}));
    }
  });
});

router.post("/getOneAccount", urlencodedParser, function (req, res) {
  var AccId = req.body.AccId;
  Account.getAccountsById(AccId, function(err, account){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ account: account}));
    }
  });
});

router.post("/getOneAccountByUserId", urlencodedParser, function (req, res) {
  var userid = req.body.userid;
  Account.getOneAccountByUserId(userid, function(err, account){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ account: account}));
    }
  });
});

router.post("/getOneAccountByAccNo", urlencodedParser, function (req, res) {
  var accountNo = req.body.accountNo;
  Account.getOneAccountByAccNo(accountNo, function(err, account){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ account: account}));
    }
  });
});

router.post("/getManyAccountByUserId", urlencodedParser, function (req, res) {
  var userid = req.body.userid;
  Account.getAccountsByUserId(userid, function(err, account){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ account: account}));
    }
  });
});

router.post("/updateAccountUsageLimit", urlencodedParser, function (req, res) {
  console.log("Account Updating Usage Limit");
 // var username = req.body.username;
 var id = req.body.id;
  var usageLimit = req.body.usageLimit;

  var newAccount = {
    usageLimit
  };

  Account.updateAccounts(id,newAccount, function (err, account) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ account: account}));
    }
  });
});

router.post("/updateAccountConnectivity", urlencodedParser, function (req, res) {
  console.log("Account Updating");
 // var username = req.body.username;
 var id = req.body.id;
 var isConnected = req.bodyisConnected;

  var newAccount = {
    isConnected: isConnected,
  };

  Account.updateUser(id,newAccount, function (err, account) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(account);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ account: account}));
    }
  });
});

 

router.post("/registerEmployee", urlencodedParser, function (req, res) {
  console.log("Register Employee Start");
  //var username = req.body.username;
  var password = req.body.password;
 // var password2 = req.body.password2;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var address = req.body.address;
  var city = req.body.city;
  var province = req.body.province;
  var nic = req.body.nic;
  var tel = req.body.contactNo;
 // var status = req.body.status;
  var type = req.body.type;
  var gender = req.body.gender;
  var email = req.body.email;
  var image = req.body.image;

  var newEmployee = {
    nic: nic,

    password: password,
    firstname: fname,
    lastname: lname,
    address: address,
    province: province,
    city: city,
    contactno: tel,
    type: type,
    gender:gender,
    email: email,
    image: image,
  };

  Employee.createEmployee(newEmployee, function (err, employee) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(employee);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ employee: employee}));
    }
  });
});

router.post("/updateEmployee", urlencodedParser, function (req, res) {
  console.log("Update Employee Start");
  //var username = req.body.username;
  var id = req.body.id;
  var password = req.body.password;
 // var password2 = req.body.password2;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var address = req.body.address;
  var nic = req.body.nic;
  var tel = req.body.tel;
 // var status = req.body.status;
  var type = req.body.type;
  var gender = req.body.gender;
  var email = req.body.email;
  var image = req.body.image;
  var city = req.body.city;
  var province = req.body.province;

  var newEmployee = {
    nic: nic,

    password: password,
    firstname: fname,
    lastname: lname,
    address: address,
    province: province,
    city: city,

    telno: tel,
    type: type,
    gender:gender,
    email: email,
    image: image,
  };

  Employee.updateEmployee(id,newEmployee, function (err, employee) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(employee);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ employee: employee}));
    }
  });
});

router.get("/getEmployees", urlencodedParser, function (req, res) {
  Employee.getEmployees(function(err, employee){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(employee);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ employee: employee}));
    }
  });
});

router.post("/getOneEmployee", urlencodedParser, function (req, res) {
  var id = req.body.id;
  Employee.getEmployeeById(id, function(err, employee){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(employee);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ employee: employee}));
    }
  });
});

router.post("/getOneEmployeeByNic", urlencodedParser, function (req, res) {
  var nic = req.body.nic;
  Employee.getEmployeeByNic(nic, function(err, employee){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(employee);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ employee: employee}));
    }
  });
});

router.post("/deleteEmployee", urlencodedParser, function (req, res) {
  console.log("Employee Deleting");
 var id = req.body.id;
  
  Employee.deleteEmployee(id, function (err, employee) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(employee);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ employee: employee}));
    }
  });
});




router.post("/registerReqType", urlencodedParser, function (req, res) {
  console.log("Register ReqType Start");
  
  var type = req.body.type;
  var newReqType = {
    Type: type
  };

  ReqType.createReqType(newReqType, function (err, reqType) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(reqType);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ reqType: reqType}));
    }
  });
});

router.get("/getReqTypes", urlencodedParser, function (req, res) {
  ReqType.getReqTypes(function(err, reqType){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(reqType);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ reqType: reqType}));
    }
  });
});

router.post("/deleteReqType", urlencodedParser, function (req, res) {
  console.log("ReqType Deleting");
  
  var id = req.body.id;
  
  ReqType.deleteReqType(id, function (err, reqType) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(reqType);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ reqType: reqType}));
    }
  });
});

router.post("/getOneReqType", urlencodedParser, function (req, res) {
  var type = req.body.type;
  ReqType.getReqTypeByName(type, function(err, reqType){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(reqType);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ reqType: reqType}));
    }
  });
});




router.post("/registerEType", urlencodedParser, function (req, res) {
  console.log("Register EType Start");
  
  var type = req.body.type;
  var newEType = {
    Type: type
  };

  EType.createEType(newEType, function (err, eType) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(eType);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ eType: eType}));
    }
  });
});

router.get("/getEType", urlencodedParser, function (req, res) {
  EType.getEType(function(err, eType){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(eType);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ eType: eType}));
    }
  });
});

router.post("/deleteEType", urlencodedParser, function (req, res) {
  console.log("EType Deleting");
  
  var id = req.body.id;
  
  EType.deleteEType(id, function (err, eType) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(eType);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ eType: eType}));
    }
  });
});

router.post("/getOneEType", urlencodedParser, function (req, res) {
  var type = req.body.type;
  EType.getETypeByName(type, function(err, eType){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(eType);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ eType: eType}));
    }
  });
});




router.post("/registerPriceDetail", urlencodedParser, function (req, res) {
  console.log("Register Price Detail Start");
  
  var price = req.body.price;
  var newPriceDetail = {
    price: price
  };

  PriceDetail.createPriceDetail(newPriceDetail, function (err, priceDetail) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(priceDetail);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ priceDetail: priceDetail}));
    }
  });
});

router.post("/updatePriceDetail", urlencodedParser, function (req, res) {
  console.log("Update Price Detail Start");
  
  var price = req.body.price;
  var newPriceDetail = {
    price: price
  };

  PriceDetail.updatePriceDetail(newPriceDetail, function (err, priceDetail) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(priceDetail);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ priceDetail: priceDetail}));
    }
  });
});

router.get("/getPriceDetail", urlencodedParser, function (req, res) {
  PriceDetail.getPriceDetails(function(err, priceDetail){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(priceDetail);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ priceDetail: priceDetail}));
    }
  });
});

router.post("/deletePriceDetail", urlencodedParser, function (req, res) {
  console.log("Price Detail Deleting");
  
  var id = req.body.id;
  
  PriceDetail.deletePriceDetail(id, function (err, priceDetail) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(priceDetail);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ priceDetail: priceDetail}));
    }
  });
});

router.post("/getOnePriceDetail", urlencodedParser, function (req, res) {
  var id = req.body.id;
  PriceDetail.getPriceDetailById(id, function(err, priceDetail){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(priceDetail);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ priceDetail: priceDetail}));
    }
  });
});




router.post("/registerPayment", urlencodedParser, function (req, res) {
  console.log("Register Payment Start");
  
  var accountId = req.body.accountId;
  var paymentData = req.body.pay;
  var newPayment = {
    paymentData: paymentData,
    accountId: accountId
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
});

router.post("/updatePayment", urlencodedParser, function (req, res) {
  console.log("Update Payment Start");
  var id = req.body.id;
  var accountId = req.body.accountId;
  var paymentData = req.body.pay;
  var newPayment = {
    paymentData: paymentData,
    accountId: accountId,
  };

  Payment.updatePayment(id,newPayment, function (err, payment) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(payment);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ payment: payment}));
    }
  });
});

router.get("/getPayment", urlencodedParser, function (req, res) {
  Payment.getPayment(function(err, payment){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(payment);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ payment: payment}));
    }
  });
});

router.post("/deletePayment", urlencodedParser, function (req, res) {
  console.log("Payment Deleting");
  
  var id = req.body.id;
  
  Payment.deletePayment(id, function (err, payment) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(payment);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ payment: payment}));
    }
  });
});

router.post("/getOnePayment", urlencodedParser, function (req, res) {
  var id = req.body.id;
  Payment.getPaymentById(id, function(err, payment){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(payment);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ payment: payment}));
    }
  });
});

router.post("/getOnePaymentByAccNo", urlencodedParser, function (req, res) {
  var AccNo = req.body.AccNo;
  Payment.getPaymentByAccNo(AccNo, function(err, payment){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(payment);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ payment: payment}));
    }
  });
});

router.post("/getManyPayment", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  Payment.getPaymentByAccountId(accountId, function(err, payment){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(payment);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ payment: payment}));
    }
  });
});

router.post("/getManyPaymentByDate", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  var date = req.body.date;
  Payment.getPaymentByDate(accountId,date, function(err, payment){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(payment);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ payment: payment}));
    }
  });
});

router.post("/getSumPayment", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  Payment.getSumPayment(accountId, function(err, payment){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(payment);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ payment: payment}));
    }
  });
});




router.post("/registerError", urlencodedParser, function (req, res) {
  console.log("Register Error Start");
  
  var accountId = req.body.accountId;
  var Errors = req.body.error;
  var isFixed = 0;
  var newError = {
    accountId: accountId,
    Error: Errors,
    isFixed: isFixed
  };

  Error.createError(newError, function (err, error2) {
    if (err) {
      console.log("errors " + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(error2);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error2: error2}));
    }
  });
});

router.post("/updateError", urlencodedParser, function (req, res) {
  console.log("Update Error Start");
  var id = req.body.id;
  var accountId = req.body.accountId;
  var error1 = req.body.error;
  var isFixed = req.body.isFixed;
  var newError = {
    accountId: accountId,
    Error: error1,
    isFixed: isFixed
  };

  Error.updateError(id,newError, function (err, error2) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(error2);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error2: error2}));
    }
  });
});

router.get("/getErrors", urlencodedParser, function (req, res) {
  Error.getError(function(err, error2){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(error2);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ error2: error2}));
    }
  });
});

router.post("/getNotFixedError", urlencodedParser, function (req, res) {
  Error.getNotFixedError(id, function(err, error2){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(error2);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ error2: error2}));
    }
  });
});

router.post("/deleteError", urlencodedParser, function (req, res) {
  console.log("Error Deleting");
  
  var id = req.body.id;
  
  Error.deleteError(id, function (err, error2) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(error2);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error2: error2}));
    }
  });
});

router.post("/getOneError", urlencodedParser, function (req, res) {
  var id = req.body.id;
  Error.getErrorById(id, function(err, error2){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(error2);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ error2: error2}));
    }
  });
});

router.post("/getOneErrorByAccNo", urlencodedParser, function (req, res) {
  var AccNo = req.body.AccNo;
  Error.getErrorByAccNo(AccNo, function(err, error2){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(error2);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ error2: error2}));
    }
  });
});

router.post("/getManyError", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  Error.getErrorByAccountId(accountId, function(err, error2){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(error2);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ error2: error2}));
    }
  });
});

router.post("/getManyErrorByDate", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  var date = req.body.date;
  Error.getErrorByDate(accountId,date, function(err, error2){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(error2);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ error2: error2}));
    }
  });
});




router.post("/registerRequest", urlencodedParser, function (req, res) {
  console.log("Register Request Start");
  
  var accountId = req.body.accountId;
  var requestData = req.body.request;
  var Type = req.body.type;
  var isPending = req.body.isPending;
  var newRequest = {
    requestData: requestData,
    accountId: accountId,
    Type: Type,
    isPending:isPending
  };

  Request.createRequest(newRequest, function (err, request) {
    if (err) {
      console.log("errors " + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(request);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ request: request}));
    }
  });
});

router.post("/updateRequest", urlencodedParser, function (req, res) {
  console.log("Update Request Start");
  var id = req.body.id;
  var accountId = req.body.accountId;
  var requestData = req.body.request;
  var Type = req.body.type;
  var isPending = req.body.isPending;
  var newRequest = {
    requestData: requestData,
    accountId: accountId,
    Type: Type,
    isPending:isPending
  };

  Request.updateRequest(id,newRequest, function (err, request) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(request);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ request: request}));
    }
  });
});

router.get("/getRequest", urlencodedParser, function (req, res) {
  Request.getRequest(function(err, request){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(request);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ request: request}));
    }
  });
});

router.post("/deleteRequest", urlencodedParser, function (req, res) {
  console.log("Request Deleting");
  
  var id = req.body.id;
  
  Request.deleteRequest(id, function (err, request) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(request);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ request: request}));
    }
  });
});

router.post("/getOneRequest", urlencodedParser, function (req, res) {
  var id = req.body.id;
  Request.getRequestById(id, function(err, request){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(request);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ request: request}));
    }
  });
});

router.post("/getManyRequest", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  Request.getRequestByAccountId(accountId, function(err, request){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(request);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ request: request}));
    }
  });
});

router.post("/getLatestRequest", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  Request.getLatestRequestByAccountId(accountId, function(err, request){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      // console.log(request);
      // res.setHeader("Content-Type", "application/json");
      // res.end(JSON.stringify({ request: request}));
      Request.getRequestById(request, function(err, request){
        if (err) {
          console.log("errors" + err.message);
          res.sendStatus(400);
          return;
        } else {
          console.log(request);
          res.setHeader("Content-Type", "application/json");
         // res.body(employee);
          res.end(JSON.stringify({ request: request}));
        }
      });
    }
  });
});


router.post("/registerUsage", urlencodedParser, function (req, res) {
  console.log("Register Usage Start");
  
  var accountId = req.body.accountId;
  var usageData = req.body.usage;
  var newUsage = {
    usageData: usageData,
    accountId: accountId
  };

  Usage.createUsage(newUsage, function (err, usage) {
    if (err) {
      console.log("errors " + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});

/////////////////Atmega URL Parameter
router.post("/registerUsageAtmega", function (req, res) {
  console.log("Register Usage Start");
  
  var accountId = req.query.accountId;
  var usageData = req.query.usage;
  console.log(accountId);
  console.log(usageData);

  var newUsage = {
    usageData: usageData,
    accountId: accountId
  };

  Usage.createUsage(newUsage, function (err, usage) {
    if (err) {
      console.log("errors " + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});
////////////////////////////////

router.post("/updateUsage", urlencodedParser, function (req, res) {
  console.log("Update Usage Start");
  var id = req.body.id;
  var accountId = req.body.accountId;
  var usageData = req.body.usage;
  var newUsage = {
    usageData: usageData,
    accountId: accountId
  };

  Usage.updateUsage(id,newUsage, function (err, usage) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});

router.get("/getUsage", urlencodedParser, function (req, res) {
  Usage.getUsage(function(err, usage){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});

router.post("/deleteUsage", urlencodedParser, function (req, res) {
  console.log("Usage Deleting");
  
  var id = req.body.id;
  
  Usage.deleteUsage(id, function (err, usage) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});

router.post("/getManyUsage", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  Usage.getUsageByAccountId(accountId, function(err, usage){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});

router.post("/getManyUsageByDate", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  var date = req.body.date;
  Usage.getUsageByDate(accountId,date, function(err, usage){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});

router.post("/getManyUsageByTwoDates", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  var date1 = req.body.date1;
  var date2 = req.body.date2;
  Usage.getUsageByTWoDates(accountId,date1,date2, function(err, usage){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});

router.post("/getSumUsageByDate", urlencodedParser, function (req, res) {
  var accountId = req.body.accountId;
  var date = req.body.date;
  Usage.getSumUsageByDate(accountId,date, function(err, usage){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});


router.post("/registerPaymentDetailes", urlencodedParser, function (req, res) {
  console.log("Register PaymentDetailes Start");
  
  var date = req.body.date;
  var newPaymentDetailes = {
    Date: date
  };

  PaymentDetailes.createPaymentDetailes(newPaymentDetailes, function (err, paymentDetailes) {
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(paymentDetailes);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ paymentDetailes: paymentDetailes}));
    }
  });
});

router.get("/getPaymentDetailes", urlencodedParser, function (req, res) {
  PaymentDetailes.getPaymentDetailes(function(err, paymentDetailes){
    if (err) {
      console.log("errors :-" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(paymentDetailes);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ paymentDetailes: paymentDetailes}));
    }
  });
});


router.post("/getOnePaymentDetailesByDate", urlencodedParser, function (req, res) {
  var date = req.body.date;
  PaymentDetailes.getPaymentDetailesByDate(date, function(err, paymentDetailes){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(paymentDetailes);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ paymentDetailes: paymentDetailes}));
    }
  });
});





router.post("/Verify", urlencodedParser, function (req, res) {
  var nic = req.body.nic;
  var password = req.body.password;
  User.getUserByNic(nic, function(err, user){
    if (err) {
      console.log("errors" + err.message);
      // res.sendStatus(400);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "User Not Authenticated",token: "", isMatched: "False"}));
      return;
    }else if (user==null) {
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "Employee Not Authenticated",token: "", isMatched: "False"}));
      return;

    } else {
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          console.log("Password Matched");
          res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "User Authenticated",token: "Aa123456789", isMatched: "True", user: user}));
          //return done(null, user);
        } else {
          console.log("Invalid password");
          //return done(null, false, { message: "Invalid password" });
          res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "User Not Authenticated",token: "", isMatched: "False"}));
        }
      });
}
});
});

router.post("/VerifyEmployee", urlencodedParser, function (req, res) {
  var nic = req.body.nic;
  var password = req.body.password;
  Employee.getEmployeeByNic(nic, function(err, employee){
    if (err) {
      console.log("errors" + err.message);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "Employee Not Authenticated",token: "", isMatched: "False"}));
      return;
    }else if (employee==null) {
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "Employee Not Authenticated",token: "", isMatched: "False"}));
      return;
    }else {
      Employee.comparePassword(password, employee.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          console.log("Password Matched");
          res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "Employee Authenticated",token: "Aa123456789", isMatched: "True", employee: employee}));
          //return done(null, user);
        } else {
          console.log("Invalid password");
          //return done(null, false, { message: "Invalid password" });
          res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "Employee Not Authenticated",token: "", isMatched: "False"}));
        }
      });
}
});
});


router.post("/VerifyToken", urlencodedParser, function (req, res) {
  var Token = req.body.Token;
    if (Token=="Aa123456789") {
      console.log("Token Matched");
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "User Authenticated", isMatched: "True"}));
    } else {
      console.log("Token Not Matched");
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({msg: "User Not Authenticated", isMatched: "False"}));
    }
  
});

router.post("/MonthlyPayment", urlencodedParser, function (req, res) {
  var date = req.body.date;
  MonthlyPayment.createMonthlyPayment(date, function(err, usage){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});


router.post("/LandingDetailes", urlencodedParser, function (req, res) {
  MonthlyPayment.LandingDetailes(function(err, usage){
    if (err) {
      console.log("errors" + err.message);
      res.sendStatus(400);
      return;
    } else {
      console.log(usage);
      res.setHeader("Content-Type", "application/json");
     // res.body(employee);
      res.end(JSON.stringify({ usage: usage}));
    }
  });
});

module.exports = router;
