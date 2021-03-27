var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser')
var User = require("../controller/user");
var connectDB = require("../config/database");

// var Center = require("../models/centers");
//var passport = require("passport");
const bcrypt = require("bcryptjs");
const saltRounds = 5;

var urlencodedParser = bodyParser.urlencoded({ extended: false })
// const passportJWTInit = require("./auth/passport_jwt");

router.get("/all", function (req, res) {
  res.send("Hello World from API. \n /getUsers \n /getOneUser \n /registerUser \n /updateUser \n /deleteUser \n /registerEmployee \n /updateEmployee \n /getEmployees \n /getOneEmployee \n /deleteEmployee \n ");
});




router.get('/getAll', async(req,res) => {
  User.findAllUser( function (err, user) {
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

router.post('/getOneById', async(req,res) => {
  User.findOneUser(req.body.id, function (err, user) {
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

router.post("/registerUser", urlencodedParser, function (req, res) {

  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var address = req.body.address;
  var nic = req.body.nic;
  var tel = req.body.contactNo;
  var city = req.body.city;
  var province = req.body.province;
  var email = req.body.email;
  var type = req.body.type;
  // var cart_id = req.body.cart_id;
  var gender = req.body.gender;

  var newUser = {
    
    first_name: fname,
    last_name: lname,
    nic: nic,
    gender:gender,
    password: password,
    type: type,
    address: address,
    city: city,
    province: province,
    email: email,
    contactNo: tel,

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

// router.post('/getOneUser', async(req,res) => {
//   try{
//          const user = await User.findById(req.body.id)
//          res.json(user)
//          console.log(user);
//   }catch(err){
//       res.send('Error ' + err)
//   }
// })

router.post("/updateUser", urlencodedParser, function (req, res) {

  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var address = req.body.address;
  var nic = req.body.nic;
  var tel = req.body.contactNo;
  var city = req.body.city;
  var province = req.body.province;
  var email = req.body.email;
  var type = req.body.type;
  // var cart_id = req.body.cart_id;
  var gender = req.body.gender;

  var newUser = {
    
    first_name: fname,
    last_name: lname,
    nic: nic,
    gender:gender,
    password: password,
    type: type,
    address: address,
    city: city,
    province: province,
    email: email,
    contactNo: tel,

  };

  let newUser2 = Object.fromEntries(Object.entries(newUser).filter(([_, v]) => v != null));

  User.updateUser(req.body.id,newUser2, function (err, user) {
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


// router.post('/deleteUser', async(req,res) => {
//   try{
//          const user = await User.findByIdAndRemove(req.body.id);
//          res.json(user)
//          console.log(user);
//   }catch(err){
//       res.send('Error ' + err)
//   }
// })

// router.post('/deleteNote', async(req,res) => {
//   try{
//     // const user = await User.findById(req.body.id);
//     // user.todos.forEach(element => {
//     //   if (element._id== req.body.noteId) {
//     //     // delete element;
//     //     const user = await User.findByIdAndUpdate({_id : req.body._id}, {$unset:["todos._id", "title", "data"]});
//     //   }
//     // });
//     // user.save();
//     // const user = await User.findByIdAndUpdate({_id : req.body._id}, {$pull:{ "todos":{"_id": req.body.noteId}}}, {'new': true});
//     User.update( 
//       {_id : req.body._id},
//       { $pull: { todos:{_id: req.body.noteId}} },
//       { safe: true },
//       function removeConnectionsCB(err, obj) {
//         console.log(obj);
//         res.json(obj)
//       });
    
//         //  console.log(user);
    
//   }catch(err){
//       res.send('Error ' + err)
//   }
// })


// router.post('/removeNote', async(req,res) => {
//   try{
//         //  const user = await User.findByIdAndUpdate({_id : req.body._id}, {$unset:{"todos.$[]._id":  req.body.id}, ["title", "data"]});
//         const user = await User.findByIdAndUpdate({_id : req.body._id}, {$project:{"todos.$[]._id":  req.body.id, "title": req.body.title, "data": req.body.data}});
//          res.json(user)
//          console.log(user);
//   }catch(err){
//       res.send('Error ' + err)
//   }
// })

// router.post('/verifyUser', async(req,res) => {
//   try{
//          const user = await User.find({nic: req.body.nic});
//          console.log("Passwords");
//          console.log(user);
//          console.log(user[0].password);
//          console.log(req.body.password);
//          if (user[0].password == req.body.password) {
//           res.json({user, isMatched:"true"})
//           console.log({user, isMatched:"true"});
//           console.log("Password Matched");
//          }else{
//           res.json({isMatched:"false"})
//           console.log("Password Not Matched");
//          }
         
//   }catch(err){
//       res.send('Error ' + err)
//   }
// })



module.exports = router;
