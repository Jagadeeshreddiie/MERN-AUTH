const express=require("express");
const bcryptjs=require("bcryptjs");

const user=require("../models/users");
const getUsers=async (req,res)=>{
    const data=await user.find({});
    res.status(201).json(data);
}
module.exports={getUsers};