const express = require("express");
const app = express();
const cors=require('cors')
const mongoose=require("mongoose");

app.use(cors({
  origin:"*"
}));

require('dotenv').config()

let todosRoute = require("./Routes/todo.js");
let usersRoute = require("./Routes/user.js");
const router = require("./Routes/user.js");

app.use(express.json());

app.use("/todos", todosRoute);
app.use("/users", usersRoute);
// //not found
// app.use("*", (req, res) => {
//   return res.status(404).json({ message: `You can't access this route ${req.originalUrl}` });
// });
mongoose
  .connect(process.env.Connect)
  .then(() => {
    console.log("connected to db server successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.port, () => {
  console.log("Your server started on PORT 3000");
});
