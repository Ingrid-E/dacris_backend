require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env_PORT || 3000


const productRoute = require('./routes/Products')
app.use('/product',productRoute)

app.listen(port,()=>{
    console.log("Server is lisetening on port 3000")
})