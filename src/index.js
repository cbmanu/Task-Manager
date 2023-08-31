const app=require('./app')
const database=require('./db/database')
database();

const port=process.env.PORT
app.listen(port,()=>{
    console.log("Server on port ", port)
})


