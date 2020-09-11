const Sequelize = require("sequelize");

var User = require("./user");
const db = require("../config/database");

var Center = db.define(
  "center",
  {
    Name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Address: {
      type: Sequelize.STRING,
    },
    TelNo: {
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
User.hasMany(Center, {
  foreignKey: {
    allowNull: false,
    name: "ownerId",
  },
});

Center.belongsTo(User);

module.exports = Center;
