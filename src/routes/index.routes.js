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
router.get("/user",auth,(req,res)=>{
    const id=req.user._id.toString()
    res.render("user",{user:req.user.name,avatar:req.user.avatar,id})
})
router.get("/",auth,async(req,res)=>{
    const tasks=await Task.find({owner:req.user._id}).lean()
    const id=req.user._id.toString()
    res.render("index",{tasks,user:req.user.name,avatar:req.user.avatar,id})
});
router.get("/about",(req,res)=>{
    res.send("about")
})

module.exports=router