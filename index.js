const express = require("express");
const app = express();

const mongoose=require("mongoose");
let todosRoute = require("./Routes/todo.js");
let usersRoute = require("./Routes/user.js");
app.use(express.json());
// app.use(cors());
app.use("/todos", todosRoute);
app.use("/users", usersRoute);

mongoose
  .connect("mongodb://localhost:27017/DEPI")
  .then(() => {
    console.log("connected to db server successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Your server started on PORT 3000");
});
