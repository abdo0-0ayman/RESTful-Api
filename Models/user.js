const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:[true,"This email is currently in use"],
    validate: {
      validator: function (value) {
        return /^\S{3,20}@(gmail|yahoo|outlook)\.com$/.test(value);
      },
      message: () => "invalid email or password",
    },
  },
  name: {
    type: String,
    required:[true,"name is required"],
    minLength: [3, "the name must have at least 3 characters"],
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:["User","Admin"],
    default:"User"
  }
});
userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
