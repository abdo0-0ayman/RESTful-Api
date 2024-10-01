const userModel = require("../Models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

let getAll = async (req, res) => {
  let users = await userModel.find();
  console.log(users);
  res.json({ data: users });
};
let create = async (req, res) => {
  let newuser = req.body;
  try {
    await userModel.create(newuser);
    return res.json({
      message: "added successfully",
      data: await userModel.find(),
    });
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ message: "This email is currently in use" });
    }
    return res.json({ error: err.message });
  }
};
const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "email and password are required" });
  }
  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.json({ message: "inavlid email or password" });
  }
  let isvalid=bcrypt.compare(password,user.password);
  if(!isvalid)
  {
    return res.json({ message: "inavlid email or password" });
  }
  let token=jwt.sign({email:user.email,id:user._id,role:user.role},process.env.SECRET,{expiresIn:"1h"});

  return res.json({ message: "success",token:token });
};

module.exports = { getAll, create ,login};
