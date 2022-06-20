require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env_PORT || 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const productRoute = require('./routes/Products')
app.use('/product',productRoute)

const categoryRoute = require('./routes/Categories')
app.use('/category',categoryRoute)

const imageRoute = require('./routes/Images')
app.use('/image',imageRoute)

app.listen(port,()=>{
    console.log("Server is lisetening on port 3000")
})

