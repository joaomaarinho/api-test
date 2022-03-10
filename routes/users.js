const express = require("express");
const router = express.Router();

const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const { verifyToken, isAdmin, isUser } = require("../middleware");

router
  .route("/users")
  .get(verifyToken, isAdmin, catchAsync(users.showAllUsers));

router
  .route("/:id")
  .get(verifyToken, isUser, catchAsync(users.showUser))
  .delete(verifyToken, isUser, catchAsync(users.deleteUser))
  .put(verifyToken, isUser, catchAsync(users.updateUser));

router.route("/register").post(catchAsync(users.createUser));

router.route("/login").post(catchAsync(users.loginUser));

router.get("/logout", users.logoutUser);

module.exports = router;
