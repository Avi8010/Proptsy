require("dotenv").config();
const fs = require("fs");
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
var ObjectID = require("mongodb").ObjectId;
const axios = require("axios");
const jwt = require("jsonwebtoken");
const path = require("path");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const { log } = require("console");

//mongoose connection
mongoose.connect("mongodb://127.0.0.1/ppppp", {
  useNewUrlParser: true,
  useUnifiedTopology: true

}
);

var conn = mongoose.connection;

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


// var pwd = bcrypt.hash("joker", 10);

// var user = {
//   _id: new ObjectID(),
//   name: "joker",
//   username: "joker",
//   // password: pwd,
// };



const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const rentPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  image: String,
  name: String,
  location: String,
  propertyType: String,
  rooms: String,
  priceRange: String,
  areaRange: String,
  areaType: String,
  avgCostNumeric: Number,
  areaNumeric: Number,
  basePrice: String,
  descr: String,
  status: String,
  possession: String,
  lattitude: Number,
  longitude: Number,
});

const rentProperty = mongoose.model("Rent Property", rentPropertySchema);

const buyPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  image: String,
  name: String,
  location: String,
  propertyType: String,
  rooms: String,
  priceRange: String,
  areaRange: String,
  areaType: String,
  avgCostNumeric: Number,
  areaNumeric: Number,
  basePrice: String,
  descr: String,
  status: String,
  possession: String,
  lattitude: Number,
  longitude: Number,
});

const buyProperty = mongoose.model("Buy Property", buyPropertySchema);

const dealtPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  image: String,
  name: String,
  location: String,
  propertyType: String,
  rooms: String,
  priceRange: String,
  areaRange: String,
  areaType: String,
  avgCostNumeric: Number,
  areaNumeric: Number,
  basePrice: String,
  descr: String,
  status: String,
  possession: String,
  lattitude: Number,
  longitude: Number,
});

const dealtProperty = mongoose.model("Dealt Property", dealtPropertySchema);

const rentedPropertySchema = new mongoose.Schema({
  p_id: Number, // property id
  image: String,
  name: String,
  location: String,
  propertyType: String,
  rooms: String,
  priceRange: String,
  areaRange: String,
  areaType: String,
  avgCostNumeric: Number,
  areaNumeric: Number,
  basePrice: String,
  descr: String,
  status: String,
  possession: String,
  lattitude: Number,
  longitude: Number,
});

const rentedProperty = mongoose.model("Rented Property", rentedPropertySchema);
// prperty and seller relationship
const sellSchema = new mongoose.Schema({
  p_id: Number,
  userId: String,
  category: String, // rent or direct sold
});

const Sell = mongoose.model("Sell", sellSchema);

// property and buyer relationship
const buySchema = new mongoose.Schema({
  p_id: Number,
  userId: String,
  category: String, // rent or direct bought
});

const buy = mongoose.model("Buy", buySchema);





app.get("/user", (req, res) => {
  res.json(User);
});

app.get("/property", authenticateToken, (req, res) => {
  res.json({ prize: "good" });
});

app.get("/buyproperties", async (req, res) => {
  console.log("finding property")
  const data = await buyProperty.find()
  // .toArray((err, data) => {
  res.json(data);
  console.log(data);
  // });
  console.log("end")
});

app.get("/rentproperties", (req, res) => {
  conn
    .collection("rent properties")
    .find()
    .toArray((err, data) => {
      res.json(data);
    });
});

app.get("/profile", async (req, res) => {
  let type = req.query.type;
  let endpt1, endpt2, condn;
  if (type === "bought") {
    endpt1 = "buys";
    endpt2 = "buy properties";
    condn = { category: "buy" };
  } else if (type === "sold") {
    endpt1 = "sells";
    endpt2 = "buy properties";
    condn = { category: "sell" };
  } else if (type === "onrent") {
    endpt1 = "sells";
    endpt2 = "rent properties";
    condn = { category: "rent" };
  } else if (type === "rented") {
    endpt1 = "buys";
    endpt2 = "buy properties";
    condn = { category: "rent" };
  } else res.status(400).send();
  console.log(endpt1, endpt2, condn, req.query.userName);

  conn
    .collection(endpt1)
    .find({ $and: [{ userId: req.query.userName }, condn] })
    .project({ p_id: 1, _id: 0 })
    .toArray(async (err, data) => {
      console.log(data);
      let result = [];
      for (let i = 0; i < data.length; i++) {
        let property = await conn
          .collection(endpt2)
          .findOne({ p_id: data[i].p_id });
        console.log(property);
        if (property !== null)
          result.push([
            property.name,
            property.location,
            property.propertyType,
            property.rooms,
            property.areaType,
            property.basePrice,
            property.possession,
          ]);
      }
      res.json(result);
    });
});


app.post("/user", cors(), async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log("Request body is empty");
      res.status(400).send("Request body is empty");
      return;
    }
    const usr = {
      _id: new ObjectID(),
      name: req.body.name,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    };
    conn.collection("users").insertOne(usr);
    console.log(usr);
    res.status(201).send(usr);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/register", cors(), async (req, res) => {
  try {
    const doesUserExist = await User.exists({ username: req.body.username });

    if (doesUserExist) {
      res.status(409).send();
    }
    console.log("hello");

    const usr = {
      _id: new ObjectID(),
      name: req.body.name,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    };
    conn.collection("users").insertOne(usr);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/login", cors(), async (req, res) => {
  console.log("i am in");
  try {
    const checkUser = await conn
      .collection("users")
      .find({ username: req.body.username })
      .toArray();
    // console.log(checkUser);
    if (checkUser.length === 0) {
      res.status(403).json({ message: "User not found" });
    } else {
      // console.log("int the loop");
      const accessToken = jwt.sign(checkUser[0], process.env.ACCESS_TOKEN, {
        expiresIn: "60s",
      });
      const refreshToken = jwt.sign(checkUser[0], process.env.REFRESH_TOKEN);

      res.status(203).json({
        message: "Login success",
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

//new accessToken when token expires using refreshtoken
app.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    delete user["iat"];
    const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
      expiresIn: "60s",
    });
    return res.json({ accessToken: newAccessToken });
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const razorpay = new Razorpay({
  key_id: "rzp_test_r3oOK27ZCfkjJ3",
  key_secret: "KwtHRn68tCSXx1iJ1sexReC5",
});

app.post("/razorpay", cors(), async (req, res) => {
  console.log("hiiii");
  const payment_capture = 0;
  const amount = 0;
  const currency = "INR";
  console.log("hiiii");
  const options = {
    amount: 50000,
    currency: currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/registerProperty", cors(), async (req, res) => {
  try {
    // const doesUserExist = await User.exists({ username: req.body.username });

    // if (doesUserExist) {
    //   res.status(409).send();
    // }
    console.log("hello");
    const pid = 4000 + Math.floor(Math.random() * 1000);
    const usr = {
      p_id: pid,
      _id: new ObjectID(),
      name: req.body.name,
      image: req.body.image,
      location: req.body.location,
      propertyType: req.body.propertyType,
      rooms: req.body.rooms,
      priceRange: req.body.priceRange,
      areaRange: req.body.areaRange,
      areaType: req.body.areaType,
      basePrice: req.body.basePrice,
      descr: req.body.descr,
      status: req.body.status,
      possession: req.body.possession,
    };

    const usrProp = {
      p_id: pid,
      userId: req.body.username,
      category: req.body.type,
    };
    conn.collection("buy properties").insertOne(usr);
    conn.collection("sells").insertOne(usrProp);
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

app.post("/paymentdone", cors(), async (req, res) => {
  console.log(req.body);
  const obj = {
    p_id: parseInt(req.query.p_id),
    userId: req.query.un,
    category: req.query.type,
  };

  conn.collection("buys").insertOne(obj);

  res.redirect("http://127.0.0.1:3000/");
  //res.sendStatus(200);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);