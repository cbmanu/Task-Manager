const mongoose=require('mongoose');
async function database(){
    try{
        const db=await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected to",db.connection.name)
    }catch(error){
        console.error(error)
    }

}
module.exports=database
