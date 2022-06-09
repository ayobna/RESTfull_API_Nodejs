const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports = {
  signup: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).json({
          message: "email already exists",
        });
      }
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "error to create user",
            error: err,
          });
        }

        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email,
          password: hash,
        });
        user
          .save()
          .then(() => {
            res.status(201).json({
              message: "user created",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "error to create user",
              error: err,
            });
          });
      });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "email or password is wrong",
        });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "error to login",
            error: err,
          });
        }
        if (result) {
          const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "login success",
            token,
          });
        }
        res.status(401).json({
          message: "email or password is wrong",
        });
      });
    });
  },
};
