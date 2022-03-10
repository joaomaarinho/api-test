require("dotenv").config();
require("./config/database").connect();
const express = require("express");
// const cookieParser = require("cookie-parser");

const usersRoutes = require("./routes/users");
const { verifyToken } = require("./middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(usersRoutes);

app.post("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome");
});

module.exports = app;
