const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
// var passport = require("passport");


//Database
var connectDB = require("./config/database");

//Test Database
connectDB();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

var api = require("./routes/api");
var auth = require("./routes/auth");
// app.use(passport.initialize());
// app.use(passport.session());
// passportJWTInit();




app.use("/api", api);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
