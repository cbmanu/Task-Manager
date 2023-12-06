const auth =require('../middleware/auth')
const Task=require("../models/task")
const User=require("../models/user");

const renderTasks=(auth,async(req,res)=>{
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
        }).lean({ virtuals: true })
        console.log(req.user.tasks)
        res.render('index',{tasks:req.user.tasks})
    }catch(e){
        console.log(e)
        res.status(500).send(e);
    }
})

const editTask=async()=>{

}
module.exports={
    renderTasks
}