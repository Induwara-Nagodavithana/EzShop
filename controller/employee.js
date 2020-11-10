var Employee = require("../models/employees");
const bcrypt = require("bcryptjs");
const saltRounds = 5;

module.exports.getEmployeeById = function (id, callback) {
  Employee.findOne({
    where: { id: id},
  }).then((employee) => {
    callback(null, employee);
  });
};

module.exports.getEmployeeByNic = function (nic, callback) {
  Employee.findOne({
    where: { nic: nic},
  }).then((employee) => {
    callback(null, employee);
  });
};

module.exports.getEmployees = function (callback) {
    Employee.findAll().then((employee) => {
      callback(null, employee);
    })
    .catch((err) => {
      callback(err);
    });
  };

module.exports.createEmployee = function (newEmployee, callback) {
  console.log("Create Employee");

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(newEmployee.password, salt, function (err, hash) {
      newEmployee.password = hash;
  Employee.create(newEmployee)
    .then((employee) => {
      callback(null, employee);
    })
    .catch((err) => {
      callback(err);
    });
  });
});
};
module.exports.updateEmployee = function (id, newEmployee, callback) {
  console.log("Update Employee");

  // newUser.password = hash;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(newEmployee.password, salt, function (err, hash) {
      newEmployee.password = hash;
  Employee.update(newEmployee, {
    where: {
      id: id,
    },
  })
    .then((employee) => {
      callback(null, employee);
    })
    .catch((err) => {
      callback(err);
    });
  });
});
};
module.exports.deleteEmployee = function (id, callback) {
  console.log("Delete employee");

  // newUser.password = hash;

  Employee.destroy({
    where: {
      id: id
    }
  })
    .then((employee) => {
      callback(null, employee);
    })
    .catch((err) => {
      callback(err);
    });
};