const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
// var passport = require("passport");

// const passportJWTInit = require("./auth/passport_jwt");
//Database
var db = require("./config/database");

//Test Database
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
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
