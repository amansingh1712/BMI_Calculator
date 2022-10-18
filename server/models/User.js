const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  username: String,
  password: String,
});

const User = model("user", UserSchema);

module.exports = User;
