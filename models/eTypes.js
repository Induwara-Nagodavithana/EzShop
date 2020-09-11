const Sequelize = require("sequelize");

const db = require("../config/database");

var EType = db.define(
  "eType",
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


module.exports = EType;