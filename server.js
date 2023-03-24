const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
var ObjectID = require("mongodb").ObjectId;
const axios = require("axios");

mongoose.connect("mongodb://127.0.0.1:/ppppp",{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
);

var conn = mongoose.connection;

const app = express();
app.use(cors());
app.use(express.json());


var pwd = bcrypt.hash("joker", 10);

var user = {
  _id: new ObjectID(),
  name: "joker",
  username: "joker",
  password: pwd,
};

conn.collection("users").insertOne(user);
const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);


app.post("/user", cors(), async (req, res) => {
  try {
    console.log(req.body);

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
app.get("/user", (req, res) => {
  res.json(user);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  }) 
  const port = 5000;

  app.listen(port, () => `Server running on port ${port}`);