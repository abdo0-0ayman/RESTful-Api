const todoModel = require("../Models/todo");

let getAll = async (req, res) => {
  let todos = await todoModel.find().populate("userId");
  console.log(todos);
  res.json({ data: todos });
};
let edit = async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let editOne = await todoModel.findByIdAndUpdate(
    id,
    { title:body.title },
    { new: true }
  ).populate("userId");
  if (editOne) {
    res.json({
      message: "edited successfully",
      data: editOne,
    });
  } else {
    res.json({ message: "faield" });
  }
};
let getById = async (req, res) => {
  let id = req.params.id;
  try {
    let todo = await todoModel.find({ _id: id }).populate("userId");
    res.json({ data: todo });
  } catch (err) {
    res.json({ message: "faield" });
  }
};
let create = async (req, res) => {
  let newtodo = req.body;
  try {
    await todoModel.create(newtodo);
    res.json({ message: "added successfully", data: await userModel.find().populate("userId") });
  } catch {
    res.json({ message: "faield" });
  }
};
let deleteById = async (req, res) => {
  let id = req.params.id;
  let deleteOne = await todoModel.findByIdAndDelete(id);
  if (deleteOne) {
    res.json({ message: "successfully deleted", data: await todoModel.find() });
  } else {
    res.json({ message: "faield" });
  }
};
let replace = async (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let replaceOne = await todoModel.findOneAndReplace({ _id: id }, body, {
    new: true,
  }).populate("userId");
  if (replaceOne) {
    res.json({
      message: "successfully replaced",
      data: replaceOne,
    });
  } else {
    res.json({ message: "faield" });
  }
};

let countDocument = async (req, res) => {
  let count = await todoModel.countDocuments({});
  res.json({ message: `there are ${count} documents in Todos` });
};

module.exports = {
  getAll,
  edit,
  getById,
  create,
  deleteById,
  replace,
  countDocument,
};
