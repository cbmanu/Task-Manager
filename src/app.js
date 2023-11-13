const express=require('express');
const morgan=require('morgan')
const exphbs=require('express-handlebars')
const app=express();
const path=require('path');
const favicon = require('serve-favicon');
const publicDirectory = path.join(__dirname,'../public')
const database=require('./db/database')
database()

app.use(express.json())

app.set('views',path.join(__dirname+'/views'))
var hbs=exphbs.create({
    layoutsDir:path.join(app.get('views'),'/layouts'),
    defaultLayout:'main',
    extname:".hbs",
})
app.engine(".hbs",hbs.engine);
app.set('view engine','.hbs');
app.use(express.static(publicDirectory))
app.use(favicon(path.join(publicDirectory+'/favicon.ico')));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

app.use(require('./routes/index.routes'));
app.use(require('./routes/task.routes'));
app.use(require('./routes/user.routes'));

module.exports=app