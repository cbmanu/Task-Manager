const auth =require('../middleware/auth')
const Task=require("../models/task")
const User=require("../models/user");

const renderTasks=(auth,async(req,res)=>{
    
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
        return req.user.tasks
    }catch(e){
        res.status(500).send(e);
    }
})

const editTask=async()=>{

}
module.exports={
    renderTasks
}