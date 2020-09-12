const Sequelize = require("sequelize");

const db = require("../config/database");
var User = require("./user");

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
  },
  {
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "UpdatedAt",
    freezeTableName: true,
  }
);

User.hasMany(Request, {
    foreignKey: {
      allowNull: false,
      //name: "id",
    },
  });
  
  Request.belongsTo(User);

module.exports = Request;