const Sequelize = require("sequelize");

const db = require("../config/database");
const Accounts = require("./accounts");
// var User = require("./user");

var Request = db.define(
  "request",
  {  
      requestData: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      Type: {
        type: Sequelize.STRING,
        allowNull: false,
        
      },
      isPending: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
  },
  {
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  }
);

Accounts.hasMany(Request, {
    foreignKey: {
      allowNull: false,
      //name: "id",
    },
  });
  
  Request.belongsTo(Accounts);

module.exports = Request;