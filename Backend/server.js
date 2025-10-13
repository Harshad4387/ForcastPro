require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.get('/', (req,res)=>{
    res.status(200).json('server is running fine');
    console.log("yes done");
    
})
const port = process.env.PORT;
// console.log(port);
app.listen(port, ()=>{
    console.log('server is running on port 3000 ~ built by harshu');
})