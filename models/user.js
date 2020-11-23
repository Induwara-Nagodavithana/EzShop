const mongoose = require("mongoose");


const user = new mongoose.Schema({
    
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    nic: {
      type: String,
      unique:true
    },
    password: {
      type: String,
    },
    todos: [
      {
        title: {
          type: String,
        },
        data: {
          type: String,
        },

      }
    ],
  }
    
);


module.exports = User = mongoose.model('users', user);
