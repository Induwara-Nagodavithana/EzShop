const Sequelize = require("sequelize");

const db = require("../config/database");
var User = require("./user");

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

User.hasMany(Payment, {
    foreignKey: {
      allowNull: false,
      //name: "id",
      unique: false,
    },
  });
  
  Payment.belongsTo(User);

module.exports = Payment;