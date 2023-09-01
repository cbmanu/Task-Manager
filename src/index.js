const app=require('./app')
const database=require('./db/database')


const PORT=process.env.PORT||3080
database().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})


