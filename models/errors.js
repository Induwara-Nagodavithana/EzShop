const Sequelize = require("sequelize");

const db = require("../config/database");
const Accounts = require("./accounts");
// var User = require("./user");

var Error = db.define(
  "error",
  {  
      Error: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      isFixed: {
        type: Sequelize.INTEGER,
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

Accounts.hasMany(Error, {
    foreignKey: {
      allowNull: false,
      //name: "id",
      unique: false,
    },
  });
  
  Error.belongsTo(Accounts);

module.exports = Error;