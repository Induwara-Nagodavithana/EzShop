const Sequelize = require("sequelize");

const db = require("../config/database");
const Accounts = require("./accounts");
// var User = require("./user");

var Payment = db.define(
  "payment",
  {  
      paymentData: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
  },
  {
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  }
);

Accounts.hasMany(Payment, {
    foreignKey: {
      allowNull: false,
      //name: "id",
      unique: false,
    },
  });
  
  Payment.belongsTo(Accounts);

module.exports = Payment;