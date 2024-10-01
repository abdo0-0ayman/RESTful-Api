const express=require('express');
const router=express.Router();
const {auth,restrictTo}=require("../middleware/auth");
const {getAll,edit,getById,create,deleteById,replace,countDocument}=require('../Controllers/todo');

router.get("/count",auth,restrictTo("User","Admin"),countDocument);

router.get("/",auth,restrictTo("User","Admin"),getAll);

router.patch("/:id",auth,restrictTo("User","Admin"),edit);

router.get("/:id",auth,restrictTo("User","Admin"),getById);

router.post("/",auth,restrictTo("User","Admin"),create);

router.delete("/:id",auth,restrictTo("User","Admin"),deleteById);

router.put("/:id",auth,restrictTo("User","Admin"),replace);


module.exports=router;
