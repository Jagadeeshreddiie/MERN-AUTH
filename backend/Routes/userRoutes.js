const express=require("express");
const {getUsers} =require("../controller/userController");
const userRoute=express.Router();

userRoute.get('/',getUsers);

module.exports={userRoute};