var express = require("express");
const multer = require("multer");

var router = express.Router();
var bodyParser = require('body-parser')
var User = require("../controller/user");
var Item = require("../controller/item");
var Order = require("../controller/order");
var Cart = require("../controller/cart");
var connectDB = require("../config/database");

//var passport = require("passport");
const bcrypt = require("bcryptjs");
const saltRounds = 5;

// var imageName;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.sellerId + '-' + Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error ('Image unacceptable!'), false);
  }
}

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


var urlencodedParser = bodyParser.urlencoded({ extended: false })
// const passportJWTInit = require("./auth/passport_jwt");

router.get("/all", function (req, res) {
  res.send("Hello World from API. \n /getAllUsers \n /getOneById \n /registerUser \n /updateUser \n /deleteUser \n /registerItems \n /updateItems \n /getAllItems \n /getOneItemsById \n /deleteItems \n ");
});


/////////////// Users API ///////////////

router.get('/getAllUsers', async (req, res) => {
  User.findAllUser(function (err, user) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ user: user }));
    }
  });
});

router.post('/getOneUserById', urlencodedParser, async (req, res) => {
  User.findOneUser(req.body.id, function (err, user) {
    console.log(req.body.id)
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ user: user }));
    }
  });
});

router.post("/registerUser", urlencodedParser, function (req, res) {

  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var address = req.body.address;
  var nic = req.body.nic;
  var tel = req.body.contactNo;
  var city = req.body.city;
  var province = req.body.province;
  var email = req.body.email;
  var type = req.body.type;
  // var cart_id = req.body.cart_id;
  var gender = req.body.gender;

  var newUser = {

    first_name: fname,
    last_name: lname,
    nic: nic,
    gender: gender,
    password: password,
    type: type,
    address: address,
    city: city,
    province: province,
    email: email,
    contactNo: tel,

  };

  User.createUser(newUser, function (err, user) {
    if (err) {
      console.log("errors" + err);
      res.setHeader("Content-Type", "application/json");
      res.end("" + err);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ user: user }));
    }
  });



});

router.post("/updateUser", urlencodedParser, function (req, res) {

  var password = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var address = req.body.address;
  var nic = req.body.nic;
  var tel = req.body.contactNo;
  var city = req.body.city;
  var province = req.body.province;
  var email = req.body.email;
  var type = req.body.type;
  // var cart_id = req.body.cart_id;
  var gender = req.body.gender;

  var newUser = {

    first_name: fname,
    last_name: lname,
    nic: nic,
    gender: gender,
    password: password,
    type: type,
    address: address,
    city: city,
    province: province,
    email: email,
    contactNo: tel,

  };

  let newUser2 = Object.fromEntries(Object.entries(newUser).filter(([_, v]) => v != null));

  User.updateUser(req.body.id, newUser2, function (err, user) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ user: user }));
    }
  });

});

router.post("/deleteUser", urlencodedParser, function (req, res) {
  console.log("User Deleting");
  var id = req.body.id;

  User.deleteUser(id, function (err, user) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(user);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ user: user }));
    }
  });
});

/////////////// Items API ///////////////

router.get('/getAllItems', async (req, res) => {
  Item.findAllItem(function (err, item) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(item);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ item: item }));
    }
  });
});

router.post('/getOneItemById', urlencodedParser, async (req, res) => {
  Item.findOneItem(req.body.id, function (err, item) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(item);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ item: item }));
    }
  });
});


router.post('/getAllItemsBySeller', urlencodedParser, async (req, res) => {
  Item.findAllItemBySeller(req.body.id, function (err, item) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(item);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ item: item }));
    }
  });
});

router.post('/getAllItemsByCategory', urlencodedParser, async (req, res) => {
  Item.findAllItemByCategory(req.body.category, function (err, item) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(item);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ item: item }));
    }
  });
});

router.post("/registerItem", urlencodedParser, upload.single('image'), function (req, res) {

  console.log(req.file);
  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var qty = req.body.qty;
  var category = req.body.category;
  var sellerId = req.body.sellerId;

  var newItem = {
    name: name,
    price: price,
    description: description,
    qty: qty,
    category: category,
    seller_id: sellerId,
    image: req.file.path
  };

  Item.createItem(newItem, function (err, item) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      // upload(req, res, (err) => {
      //   if (err) {
      //     res.sendStatus(400);
      //     return;
      //   } else {
      console.log(item);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ item: item }));
      //   }
      // });
    }
  });

});


router.post("/updateItem", urlencodedParser,upload.single('image'), function (req, res) {

  var imageName2 = null;
  if (req.file!=null) {
    // upload.single('image');
    imageName2=req.file.path;
  }

  var name = req.body.name;
  var price = req.body.price;
  var description = req.body.description;
  var qty = req.body.qty;
  var category = req.body.category;
  var sellerId = req.body.sellerId;

  var newItem = {
    name: name,
    price: price,
    description: description,
    qty: qty,
    category: category,
    seller_id: sellerId,
    image: imageName2
  };
  console.log(imageName2);

  let newItem2 = Object.fromEntries(Object.entries(newItem).filter(([_, v]) => v != null));

  Item.updateItem(req.body.id, newItem2, function (err, item) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(item);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ item: item }));
    }
  });

});

router.post("/deleteItem", urlencodedParser, function (req, res) {
  console.log("Item Deleting");
  var id = req.body.id;

  Item.deleteItem(id, function (err, item) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(item);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ item: item }));
    }
  });
});


/////////////// Orders API ///////////////

router.get('/getAllOrders', async (req, res) => {
  Order.findAllOrder(function (err, order) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(order);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ order: order }));
    }
  });
});

router.post('/getOneOrderById', urlencodedParser, async (req, res) => {
  Order.findOneOrder(req.body.id, function (err, order) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(order);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ order: order }));
    }
  });
});


router.post('/getAllOrdersBySeller', urlencodedParser, async (req, res) => {
  Order.findAllOrderBySeller(req.body.id, function (err, order) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(order);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ order: order }));
    }
  });
});

router.post('/getAllOrdersByCustomer', urlencodedParser, async (req, res) => {
  Order.findAllOrderByCustomer(req.body.id, function (err, order) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(order);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ order: order }));
    }
  });
});


router.post('/getAllOrdersByDateAndCID', urlencodedParser, async (req, res) => {
  Order.findAllOrderByDateAndCID(req.body.id, req.body.sDate, req.body.eDate, function (err, order) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(order);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ order: order }));
    }
  });
});

router.post("/registerOrder", function (req, res) {

  var CID = req.body.customer_id;
  var order = req.body.order;
  var date = req.body.order_date;

  var newOrder = {
    customer_id: CID,
    order: order,
    order_date: date,
  };

  Order.createOrder(newOrder, function (err, order) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(order);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ order: order }));
    }
  });

});


router.post("/updateOrder", urlencodedParser, function (req, res) {


  var CID = req.body.customer_id;
  var order = req.body.order;
  var date = req.body.order_date;

  var newOrder = {
    customer_id: CID,
    order: order,
    order_date: date,
  };

  let newOrder2 = Object.fromEntries(Object.entries(newOrder).filter(([_, v]) => v != null));

  Order.updateOrder(req.body.id, newOrder2, function (err, order) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(order);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ order: order }));
    }
  });
});


router.post("/deleteOrder", urlencodedParser, function (req, res) {
  console.log("Order Deleting");
  var id = req.body.id;

  Order.deleteOrder(id, function (err, order) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(order);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ order: order }));
    }
  });
});



/////////////// Carts API ///////////////

router.get('/getAllCarts', async (req, res) => {
  Cart.findAllCart(function (err, cart) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(cart);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ cart: cart }));
    }
  });
});

router.post('/getOneCartById', urlencodedParser, async (req, res) => {
  Cart.findOneCart(req.body.id, function (err, cart) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(cart);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ cart: cart }));
    }
  });
});

router.post('/getCartByCustomer', urlencodedParser, async (req, res) => {
  Cart.findCartByCustomer(req.body.id, function (err, cart) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(cart);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ cart: cart }));
    }
  });
});

router.post("/registerCart", urlencodedParser, function (req, res) {

  var CID = req.body.customer_id;
  var items = req.body.items;

  var newCart = {
    customer_id: CID,
    items: items,
  };

  Cart.createCart(newCart, function (err, cart) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(cart);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ cart: cart }));
    }
  });

});


router.post("/updateCart", urlencodedParser, function (req, res) {


  var CID = req.body.customer_id;
  var items = req.body.items;

  var newCart = {
    customer_id: CID,
    items: items,
  };

  let newCart2 = Object.fromEntries(Object.entries(newCart).filter(([_, v]) => v != null));

  Cart.updateCart(req.body.id, newCart2, function (err, cart) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(cart);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ cart: cart }));
    }
  });
});

router.post("/updateCartByCID", urlencodedParser, function (req, res) {


  var CID = req.body.customer_id;
  var items = req.body.items;

  var newCart = {
    customer_id: CID,
    items: items,
  };

  let newCart2 = Object.fromEntries(Object.entries(newCart).filter(([_, v]) => v != null));

  Cart.updateCartByCID(CID, newCart2, function (err, cart) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(cart);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ cart: cart }));
    }
  });
});


router.post("/deleteCart", urlencodedParser, function (req, res) {
  console.log("Cart Deleting");
  var id = req.body.id;

  Cart.deleteCart(id, function (err, cart) {
    if (err) {
      console.log("errors" + err);
      res.sendStatus(400);
      return;
    } else {
      console.log(cart);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ cart: cart }));
    }
  });
});

module.exports = router;
