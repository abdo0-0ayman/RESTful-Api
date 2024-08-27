const userModel = require("../Models/user");

let getAll = async (req, res) => {
  let users = await userModel.find();
  console.log(users);
  res.json({ data: users });
};
let create = async (req, res) => {
  let newuser = req.body;
  try {
    await userModel.create(newuser);
    res.json({ message: "added successfully", data: await userModel.find() });
  } catch {
    res.json({ message: "faield" });
  }
};

module.exports={getAll,create};
