const Sequelize = require("sequelize");

const db = require("../config/database");

var PriceDetail = db.define(
  "priceDetail",
  {  
    price: {
        type: Sequelize.FLOAT,
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

module.exports = PriceDetail;