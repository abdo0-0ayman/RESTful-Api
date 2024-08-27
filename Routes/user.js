const express=require('express');
const router=express.Router();

const {getAll,create}=require('../Controllers/user');

router.get("/",getAll);

router.post("/",create);

module.exports=router;
