const {Schema,model}=require('mongoose');

 
const taskSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },done:{
        type:Boolean,
        default:false
    },owner:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },},{
        timestamps:true,
        versionKey:false
    })



module.exports=model('Task',taskSchema);