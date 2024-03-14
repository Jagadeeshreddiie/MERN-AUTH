const express=require("express");
const {signUp,singin} =require("../controller/authController");
const authRoute=express.Router();
authRoute.post('/signup',signUp);
authRoute.post('/signin',singin);
module.exports={authRoute};