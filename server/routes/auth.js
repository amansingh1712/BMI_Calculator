const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;

  const isUsernameExist = await User.findOne({ username });

  if (isUsernameExist) {
    return res.send({ message: "Username already exist" });
  }

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

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: "Invalid User" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.send(401).send("Invalid Credentials");
    }

    const userdata = {
      name: user.name,
      userid: user._id,
    };
    const token = jwt.sign(userdata, "SECRET", { expiresIn: "4 hour" });
    return res.send({
      message: "login Succes",
      token: token,
      userdata: userdata,
    });
});

module.exports = authRouter;
