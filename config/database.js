const mongoose = require("mongoose");
require("dotenv")

// const dbURL = process.env.DB_URL || "mongodb://localhost:27017/authJWT";
const dbURL = "mongodb://localhost:27017/authJWT";

exports.connect = () => {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.modelNames("open", () => {
    console.log("database connected!");
  });
};