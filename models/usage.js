const Sequelize = require("sequelize");

const db = require("../config/database");
var User = require("./user");

var Usage = db.define(
  "usage",
  {  
      usageData: {
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
User.hasMany(Usage, {
    foreignKey: {
      allowNull: false,
      name: "id",
    },
  });
  
  Usage.belongsTo(User);

module.exports = Usage;