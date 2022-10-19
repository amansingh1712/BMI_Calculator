const { Schema, model } = require("mongoose");

const BmiSchema = new Schema({
  userid: String,
  bmi: Number,
  date: String,
});

const Bmi = model("bmi", BmiSchema);

module.exports = Bmi;
