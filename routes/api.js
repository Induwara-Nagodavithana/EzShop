var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser')
var User = require("../models/user");
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




// router.get("/getUsers", urlencodedParser, async (req, res) {
//   const { first_name, last_name} = req.body;
// });



// router.post("/registerUser", async (req, res) => {
//   const { first_name, last_name} = req.body;
//   let user = {};
//   user.first_name = first_name;
//   user.last_name = last_name;
//   let userModel = new User(user);
//   await userModel.save();
// res.json(userModel);
// });

router.get('/getAll', async(req,res) => {
  try{
         const user = await User.find()
         res.json(user);
         console.log(user);
  }catch(err){
      res.send('Error ' + err)
  }
})

router.post('/getOneUser', async(req,res) => {
  try{
         const user = await User.findById(req.body.id)
         res.json(user)
         console.log(user);
  }catch(err){
      res.send('Error ' + err)
  }
})

router.post('/updateUser', async(req,res) => {
  try{
         const user = await User.findByIdAndUpdate({_id : req.body._id}, {$set:{todos: req.body.todos}});
         res.json(user)
         console.log(user);
  }catch(err){
      res.send('Error ' + err)
  }
})

router.post('/deleteUser', async(req,res) => {
  try{
         const user = await User.findByIdAndRemove(req.body.id);
         res.json(user)
         console.log(user);
  }catch(err){
      res.send('Error ' + err)
  }
})

router.post('/deleteNote', async(req,res) => {
  try{
    // const user = await User.findById(req.body.id);
    // user.todos.forEach(element => {
    //   if (element._id== req.body.noteId) {
    //     // delete element;
    //     const user = await User.findByIdAndUpdate({_id : req.body._id}, {$unset:["todos._id", "title", "data"]});
    //   }
    // });
    // user.save();
    // const user = await User.findByIdAndUpdate({_id : req.body._id}, {$pull:{ "todos":{"_id": req.body.noteId}}}, {'new': true});
    User.update( 
      {_id : req.body._id},
      { $pull: { todos:{_id: req.body.noteId}} },
      { safe: true },
      function removeConnectionsCB(err, obj) {
        console.log(obj);
        res.json(obj)
      });
    
        //  console.log(user);
    
  }catch(err){
      res.send('Error ' + err)
  }
})


router.post('/removeNote', async(req,res) => {
  try{
        //  const user = await User.findByIdAndUpdate({_id : req.body._id}, {$unset:{"todos.$[]._id":  req.body.id}, ["title", "data"]});
        const user = await User.findByIdAndUpdate({_id : req.body._id}, {$project:{"todos.$[]._id":  req.body.id, "title": req.body.title, "data": req.body.data}});
         res.json(user)
         console.log(user);
  }catch(err){
      res.send('Error ' + err)
  }
})

router.post('/verifyUser', async(req,res) => {
  try{
         const user = await User.find({nic: req.body.nic});
         console.log("Passwords");
         console.log(user);
         console.log(user[0].password);
         console.log(req.body.password);
         if (user[0].password == req.body.password) {
          res.json({user, isMatched:"true"})
          console.log({user, isMatched:"true"});
          console.log("Password Matched");
         }else{
          res.json({isMatched:"false"})
          console.log("Password Not Matched");
         }
         
  }catch(err){
      res.send('Error ' + err)
  }
})


router.post("/registerUser", async (req, res) => {

  var todoArray = [];
  for (let index = 0; index < req.body.todos.length; index++) {
    const todos = {
      title:req.body.todos[index].title,
      data: req.body.todos[index].data  
    }
    todoArray.push(todos);
  }
 
  
  const user = new User({
    nic: req.body.nic,
    password: req.body.password,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    todos: todoArray
  })
  try {
    const a1 = await user.save();
    console.log(a1);
    res.json(a1);
  } catch (error) {
    res.json('Error');
  }
});



module.exports = router;
