const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authRouter = Router();

authRouter.post("/signup", (req, res) => {
  const { name, username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const user = new User({
    name,
    username,
    password: hash,
  });
  user.save((err, success) => {
    if (err) {
      return res.status(500).send({ message: "Error Occured while signup" });
    }
    return res.status(201).send({ message: "Signup Success" });
  });
});

module.exports = authRouter;
