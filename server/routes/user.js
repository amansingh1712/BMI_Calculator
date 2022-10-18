const Bmi = require("../models/Bmi");
const jwt = require("jsonwebtoken");
const Router = require("express");

const userRouter = Router();

userRouter.get("/:userid/bmi", async (req, res) => {
  const { userid } = req.params;

  const token = req.headers["authorization"].split(" ")[1];

  try {
    const verification = jwt.verify(token, "SECRET");
    if (verification) {
      const bmi = await Bmi.find({ userid });
      return res.send(bmi);
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
});

userRouter.post("/:userid/bmi", async (req, res) => {
  const { bmi } = req.body;
  const { userid } = req.params;

  const token = req.headers["authorization"].split(" ")[1];

  try {
    const verification = jwt.verify(token, "SECRET");
    if (verification) {
      const bmiValue = new Bmi({
        bmi,
        date: new Date(),
        userid,
      });

      await bmiValue.save();

      return res.send({ message: "Succes" });
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
});

module.exports = userRouter;
