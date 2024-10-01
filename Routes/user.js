const express=require('express');
const router=express.Router();
const {auth,restrictTo}=require("../middleware/auth")
const {getAll,create,login}=require('../Controllers/user');

router.get("/",auth,restrictTo('Admin'),getAll);

router.post("/",create);

router.post("/login",login);

module.exports=router;
