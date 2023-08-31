const express=require('express')
const router=express.Router();

router.get("/",(req,res)=>{
    res.render("userForm")
})
router.get("/about",(req,res)=>{
    res.send("about")
})

module.exports=router