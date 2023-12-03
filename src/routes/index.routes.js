const express=require('express')
const Task=require("../models/task")
const auth=require("../middleware/auth")
const router=express.Router();

router.get("/signUp",(req,res)=>{
    res.render("signUp")
})
router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/",auth,async(req,res)=>{
    const tasks= await Task.find().lean();
    res.render('index',{tasks})
})
router.get("/about",(req,res)=>{
    res.send("about")
})

module.exports=router