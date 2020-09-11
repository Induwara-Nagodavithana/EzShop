const Sequelize = require("sequelize");

const db = require("../config/database");

var ReqType = db.define(
  "reqType",
  {  
    Type: {
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


module.exports = ReqType;