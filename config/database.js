const Sequelize = require("sequelize");

db = new Sequelize("swmsNew", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sync({ force: false }).then(() => {
  //After db created this will run
});
module.exports = db;
