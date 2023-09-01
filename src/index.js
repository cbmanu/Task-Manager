const app=require('./app')
const database=require('./db/database')


const port=process.env.PORT
database().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})


