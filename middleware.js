const jwt = require("jsonwebtoken");
const { findOne } = require("./models/user");
const User = require("./models/user");

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required!");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    //redirect to login page
    return res.status(401).send("Invalid token!");
  }
  return next();
};

module.exports.createUserError = (err) => {
  console.log(err.message, err.code);
  let errors = { first_name: "", last_name: "", email: "", password: "" };

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//admin only requests
module.exports.isAdmin = (req, res, next) => {
  const token = req.headers["x-access-token"];

  const decoded = jwt.decode(token, { complete: true });
  if (!decoded.payload.isAdmin) {
    res.send("You are not allowed to see this request");
  } else {
    next();
  }
};

//requests for logged user or admin
module.exports.isUser = (req, res, next) => {
  const token = req.headers["x-access-token"];

  const userId = req.params.id;

  const decodedToken = jwt.decode(token, { complete: true });
  if (decodedToken.payload.user_id === userId || decodedToken.payload.isAdmin) {
    next();
  } else {
    res.send("You are not allowed to do this");
  }
};
