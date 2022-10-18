const { Router } = require("express");

const User = require("../models/User");

const authRouter = Router();

authRouter.post("/signup", (req, res) => {
  const { name, username, password } = req.body;

  const user = new User({
    name,
    username,
    password,
  });

  user.save((err, success) => {
    if (err) {
      return res.status(500).send({ message: "Error Occured while signup" });
    }

    return res.status(201).send({ message: "Signup Success", data: success });
  });
});

module.exports = authRouter;
