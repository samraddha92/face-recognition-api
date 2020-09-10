const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const userprofile = require("./controllers/userprofile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Generic GET Route
app.get("/", (req, res) => {
  res.send("It is working!");
});

// SIGNIN Route
app.post("/signin", (req, res) => {
  signin.signInUser(req, res, db, bcrypt);
});

// REGISTER Route
app.post("/register", (req, res) => {
  register.handleRegistration(req, res, db, bcrypt);
});

// PROFILE Route
app.get("/profile/:id", (req, res) => {
  userprofile.getUserProfile(req, res, db);
});

// IMAGE Route
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

// IMAGEURL Route
app.post("/imageurl", (req, res) => {
  image.hanldeApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is Running on Port ${process.env.PORT}`);
});
