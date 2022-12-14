const Bmi = require("../models/Bmi");
const jwt = require("jsonwebtoken");
const Router = require("express");

const userRouter = Router();

userRouter.get("/:userid/bmi", async (req, res) => {
  const { userid } = req.params;
  console.log("userid:", userid);

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

  let date = new Date();
  let current_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  var currentOffset = date.getTimezoneOffset();

  var ISTOffset = 330;

  var ISTTime = new Date(date.getTime() + (ISTOffset + currentOffset) * 60000);

  let current_time =
    ISTTime.getHours() +
    ":" +
    ISTTime.getMinutes() +
    ":" +
    ISTTime.getSeconds();

  let date_time = current_date + " " + current_time;

  try {
    const verification = jwt.verify(token, "SECRET");
    if (verification) {
      const bmiValue = new Bmi({
        bmi,
        date: date_time,
        userid,
      });
      await bmiValue.save();
      return res.send({ message: "Success" });
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
});

module.exports = userRouter;
