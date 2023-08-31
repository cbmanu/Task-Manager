const express=require('express')
const router=express.Router();
const Task=require("../models/task")
const auth=require("../middleware/auth")

router.get("/tasks",auth,async(req,res)=>{
    const match={}
    if(req.query.done){
        match.done=req.query.done==="true"
    }
    const sort={}
    if(req.query.sortBy){
        const parts=req.query.sortBy.split("_")
        sort[parts[0]]=parts[1]==='desc' ? -1 : 1
    }
    try{
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e);
    }
})

router.post("/tasks/add",auth,async(req,res)=>{
    const task=new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/task/:id",auth,async(req,res)=>{
    const _id=req.params.id
    try{
        const task =await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send("There is no document with that id")
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e);
    }
})

router.patch("/task/:id",auth,async(req,res)=>{
    const allowedUpdates=["title","description","done"]
    const updates=Object.keys(req.body)
    const isValid=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValid){
    return res.status(400).send({Error:"invalid update!"})
    }

    try{
        const task=await Task.findOneAndUpdate({owner:req.user._id,_id:req.params.id},req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send("theres no task with that ID")
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})
router.delete("/task/:id",auth,async(req,res)=>{
    try{
        const task=await Task.findOneAndDelete({owner:req.user._id,_id:req.params.id})
        if(!task){
            return res.status(404).send("theres no task with that ID")
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router