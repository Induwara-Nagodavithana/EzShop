const { Decimal128 } = require("bson");
const mongoose = require("mongoose");


const item = new mongoose.Schema({

    name: {
        type: String,
    },
    price: {
        type: Decimal128,
    },
    seller_id: {
        type: String,
    },

}

);


module.exports = Item = mongoose.model('items', item);