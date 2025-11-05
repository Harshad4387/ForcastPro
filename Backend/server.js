require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require('morgan');
const connect = require("./db/db");
const auth = require("./routes/auth/auth.route");
const store = require("./routes/store/inward.route");
const admin = require("./routes/Admin/rawmaterail.route");
const cors = require('cors');
connect();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth',auth);
app.get('/', (req,res)=>{
    res.status(200).json('server is running fine');
    console.log("yes done");
    
})
app.use("/api/store",store);
app.use("/api/admin",admin);
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log('server is running on port 3000 ~ built by harshu');
})