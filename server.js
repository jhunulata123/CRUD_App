const express = require('express');
const dotenv = require(`dotenv`);
const morgan = require('morgan');
const app = express();
const bodyparser = require("body-parser");
const path = require('path');
const connectDB=require('./server/database/connection');
const bcrypt=require("bcrypt");   //importing bcrypt package


dotenv.config({path:`config.env`})
const PORT = process.env.PORT||8080

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

const static_path=path.join(__dirname,"../public");
app.use(express.static(static_path))


//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
//app.set("views", path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
//css/style.css
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require("./server/routes/router"))


app.listen(PORT,()=>{console.log(`Server is running on the http://localhost:${PORT}`)});