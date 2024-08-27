const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    match: [/^\S+@(gmail|yahoo)\.(com|org)$/, "please enter a valid email"],
  },
  name: {
    type: String,
    default: "user",
    minLength: [3, "the name must have at least 3 characters"],
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
