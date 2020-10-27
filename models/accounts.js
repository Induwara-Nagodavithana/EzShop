const Sequelize = require("sequelize");

const db = require("../config/database");
const User = require("./user");

var Accounts = db.define(
  "accounts",
  {
    accountNo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    usageLimit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isConnected: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    city: {
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

User.hasMany(Accounts, {
    foreignKey: {
      allowNull: false,
      //name: "id",
      unique: false,
    },
  });
  
  Accounts.belongsTo(User);

module.exports = Accounts;
