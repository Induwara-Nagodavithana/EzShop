var Usage = require("../models/usage");
const Sequelize = require("sequelize");


  module.exports.createUsage = function (newUsage, callback) {
    console.log("Create Usage");
  
    Usage.create(newUsage)
      .then((usage) => {
        callback(null, usage);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.getUsage = function (callback) {
    Usage.findAll().then((usage) => {
      callback(null, usage);
    })
    .catch((err) => {
      callback(err);
    });
  };
  
  module.exports.getUsageById = function (id, callback) {
    Usage.findOne({
      where: { id: id},
    }).then((usage) => {
      callback(null, usage);
    });
  };
  
  module.exports.getUsageByAccountId = function (accountId, callback) {
    Usage.findAll({
      where: { accountId: accountId},
    }).then((usage) => {
      callback(null, usage);
    });
  };

  module.exports.getUsageByDate = function (accountId,date, callback) {
    const Op = Sequelize.Op;
    console.log(date);
    Usage.findAll({
      where: { 
        accountId: accountId,
        UpdatedAt: { [Op.startsWith]: date },
        

      },
    }).then((usage) => {
      callback(null, usage);
    });
  };

  module.exports.getUsageByTWoDates = function (accountId,date1,date2, callback) {
    const Op = Sequelize.Op;
    console.log(date1);
    Usage.findAll({
      where: { 
        accountId: accountId,
        [Op.or]: [
          {
          UpdatedAt: { 
            [Op.startsWith]: date1 
          }
        },
        {
          UpdatedAt: { 
            [Op.startsWith]: date2 
          }
        },
      ],
        

      },
    }).then((usage) => {
      callback(null, usage);
    });
  };

  module.exports.getSumUsageByDate = function (accountId,date, callback) {
    const Op = Sequelize.Op;
    console.log(date);
    Usage.sum('usageData',{
      where: { 
        accountId: accountId,
        UpdatedAt: { [Op.startsWith]: date },
      },
    }).then((usage) => {
      callback(null, usage);
    });
  };

  module.exports.updateUsage = function (id, newUsage, callback) {
    console.log("Update Usage");
  
    // newUser.password = hash;
  
    Usage.update(newUsage, {
      where: {
        id: id,
      },
    })
      .then((usage) => {
        callback(null, usage);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.deleteUsage = function (id, callback) {
    console.log("Delete Usage");
  
    // newUser.password = hash;
  
    Usage.destroy({
      where: {
        id: id
      }
    })
      .then((usage) => {
        callback(null, usage);
      })
      .catch((err) => {
        callback(err);
      });
  };
  