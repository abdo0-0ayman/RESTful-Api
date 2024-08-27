const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    trim: true,
    minLength: [3, "the title must have at least 3 characters"],
  },
  status: {
    type: String,
    enum: ["todo", "in progress", "done"],
    default: "todo",
  },
});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
