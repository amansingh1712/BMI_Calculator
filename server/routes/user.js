const Bmi = require("../models/Bmi");

const Router = require("express");

const userRouter = Router();

userRouter.get("/:userid/bmi", async (req, res) => {
  const { userid } = req.params;

  const bmi = await Bmi.find({ userid });
  return res.send(bmi);
});

userRouter.post("/:userid/bmi", async (req, res) => {
  const { bmi } = req.body;
  const { userid } = req.params;

  const bmiValue = new Bmi({
    bmi,
    date: new Date(),
    userid,
  });

  await bmiValue.save();

  return res.send({ message: "Succes", bmiValue });
});

module.exports = userRouter;
