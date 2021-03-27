const mongoose = require("mongoose");


const cart = new mongoose.Schema({

    customer_id: {
        type: String,
    },
    seller_id: {
        type: String,
    },
    items: [
        {
            item_id: {
                type: String,
            },
            qty: {
                type: Number,
            },
        }
    ],


}

);


module.exports = Cart = mongoose.model('carts', cart);