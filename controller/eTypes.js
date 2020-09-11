var EType = require("../models/eTypes");


module.exports.createEType = function (newEType, callback) {
    console.log("Create Employee Type");
  
    EType.create(newEType)
      .then((eType) => {
        callback(null, eType);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  module.exports.getEType = function (callback) {
    EType.findAll().then((eType) => {
      callback(null, eType);
    })
    .catch((err) => {
      callback(err);
    });
  };
   
  module.exports.deleteEType = function (id, callback) {
    console.log("Delete Employee Type");
  
    // newUser.password = hash;
  
    EType.destroy({
      where: {
        id: id
      }
    })
      .then((eType) => {
        callback(null, eType);
      })
      .catch((err) => {
        callback(err);
      });
  };

  module.exports.getETypeByName = function (type, callback) {
    EType.findOne({
      where: {  Type: type},
    }).then((eType) => {
      callback(null, eType);
    });
  };