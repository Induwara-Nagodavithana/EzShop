// const Sequelize = require("sequelize");

// db = new Sequelize("jfbwqcra4wtt0q2k", "o02i021ignqxfh05", "eu6ebv88v7qubzz0", {
//   host: "dno6xji1n8fm828n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

const mongoose = require("mongoose");

const URI = 'mongodb+srv://admin:1234@testcluster1.7genl.mongodb.net/notes?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology:true,
    useNewUrlParser: true
  });
  console.log('DB connected ....');
}


module.exports = connectDB;
