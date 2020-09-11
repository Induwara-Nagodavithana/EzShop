var Employee = require("../models/employees");

module.exports.getEmployeeById = function (id, callback) {
  Employee.findOne({
    where: { id: id},
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

  Employee.create(newEmployee)
    .then((employee) => {
      callback(null, employee);
    })
    .catch((err) => {
      callback(err);
    });
};
module.exports.updateEmployee = function (id, newEmployee, callback) {
  console.log("Update Employee");

  // newUser.password = hash;

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