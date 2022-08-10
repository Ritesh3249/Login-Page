const express = require("express");
const User = require("../model/Auth");
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const controller = require("../controller/user.controller");

router.get("/get-all-users", fetchuser, controller.allUser);

// Route 1: Create a user usring post

router.post(
  "/createuser",
  [
    body("name", "Name must be at least 3 character").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("phone", "Phone number must be 10 digit").isLength({
      min: 10,
    }),
    body("password", "passowrd must be at least 5 character").isLength({
      min: 5,
    }),
  ],
  controller.createUser
);
//   Route 2: Authticate a user using post "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the valid password").exists(),
  ],
  controller.loginUser
);

router.put("/update-user/:id", fetchuser, controller.updateUser);
router.delete("/delete-user/:id", fetchuser, controller.deleteUser);

module.exports = router;
