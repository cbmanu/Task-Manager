const {Schema,model}=require('mongoose');
const validator=require('validator');
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const Task=require("./task")
 
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("The password cant include 'password' ")
            }
        }   
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("The age must be positive")
            }
        }
    },tokens:[{
        token:{
            type:String,
            required:true
        }
    }],avatar:{
        type:Buffer
    }},{
        timestamps:true,
        versionKey:false
    })

userSchema.methods.toJSON= function(){
    user=this
    const userObj=user.toObject()
    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar

    return userObj
}

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.generateAuthToken=async function(){
    user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET,{expiresIn:"1h"})
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const match = await bcrypt.compare(password,user.password)
    if (!match){
        throw new Error('Unable to login')
    }else{
        return user;
    }
}


userSchema.pre('deleteOne',{document:true},async function(next){
    user=this
    await Task.deleteMany({owner:user._id})
    next()
})
//encrypting password before saving    
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }
    next()
})

const User=model('User',userSchema);




module.exports=User