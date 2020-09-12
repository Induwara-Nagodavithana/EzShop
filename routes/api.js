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
var Center = require("../models/centers");


var urlencodedParser = bodyParser.urlencoded({ extended: false })


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

router.get("/getOneUser", urlencodedParser, function (req, res) {
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

router.post("/registerUser", urlencodedParser, function (req, res) {
  console.log("Register USer Start");
 // var username = req.body.username;
  var password = req.body.password;
 var accountNo = req.body.accountNo;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var address = req.body.address;
  var nic = req.body.nic;
  var tel = req.body.contactNo;
  var city = req.body.city;
  var province = req.body.province;
  var type = req.body.type;

  var newUser = {
    nic: nic,
    accountno: accountNo,
    password: password,
    firstname: fname,
    lastname: lname,
    address: address,
    province: province,
    city: city,
    contactno: tel,
    type: type,
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
  var nic = req.body.nic;
  var tel = req.body.tel;
  var status = req.body.status;
  var type = req.body.type;

  var newUser = {
    nic: nic,

    password: password,
    firstname: fname,
    lastname: lname,
    address: address,

    telno: tel,
    status: status,
    type: type,
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

  var newEmployee = {
    nic: nic,

    password: password,
    firstname: fname,
    lastname: lname,
    address: address,

    telno: tel,
    type: type,
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

router.get("/getOneEmployee", urlencodedParser, function (req, res) {
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

router.get("/getOneReqType", urlencodedParser, function (req, res) {
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

router.get("/getOneEType", urlencodedParser, function (req, res) {
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

router.get("/getOnePriceDetail", urlencodedParser, function (req, res) {
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
  
  var userId = req.body.userId;
  var paymentData = req.body.pay;
  var newPayment = {
    paymentData: paymentData,
    userId: userId
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
  var userId = req.body.userId;
  var paymentData = req.body.pay;
  var newPayment = {
    paymentData: paymentData,
    userId: userId
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

router.get("/getOnePayment", urlencodedParser, function (req, res) {
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

module.exports = router;
