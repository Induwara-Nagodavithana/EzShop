const Sequelize = require("sequelize");

const db = require("../config/database");

var PaymentDetailes = db.define(
  "paymentDetailes",
  {  
    Date: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
  },
  {
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  }
);


module.exports = EType;