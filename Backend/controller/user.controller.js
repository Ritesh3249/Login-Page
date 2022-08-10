const User = require("../model/Auth");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var privatekey = process.env.USER_PRIVATE_KEY;

module.exports = {
  createUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User already exists with this email" });
      }
      //Incripting password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Creating new user

      user = await User.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      var authtoken = jwt.sign(data, privatekey);

      res.cookie("auth", authtoken).send("User created successfully");
    } catch (err) {
      console.log(err);
    }
  },
  loginUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).send("sorry please enter the valid credentials");
      }
      //password comparision
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).send("Sorry please enter the valid credentials");
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      var authtoken = jwt.sign(data, privatekey);

      res.cookie("auth", authtoken).send("Login successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Some error occurrd");
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, password, email, phone } = req.body;

      userId = req.params.id;

      const updatedData = {};
      if (name) {
        updatedData.name = name;
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.newPassword, salt);
        updatedData.password = secPass;
      }
      if (email) {
        updatedData.email = email;
      }
      if (phone) {
        updatedData.phone = phone;
      }
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updatedData },
        { new: true }
      );
      res.send("User updated successfully");
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const deleteUser = await User.deleteOne({ _id: req.params.id });
      res.send("User deleted successfully");
    } catch (error) {
      console.log(error);
    }
  },
  allUser: async (req, res) => {
    try {
      const getAllUserData = await User.find();
      res.send(getAllUserData);
    } catch (errors) {
      console.log(errors);
    }
  },
};
