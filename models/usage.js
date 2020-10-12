const Sequelize = require("sequelize");

const db = require("../config/database");
const Accounts = require("./accounts");
// var User = require("./user");

var Usage = db.define(
  "usage",
  {  
      usageData: {
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
Accounts.hasMany(Usage, {
    foreignKey: {
      allowNull: false,
     // name: "id",
    },
  });
  
  Usage.belongsTo(Accounts);

module.exports = Usage;