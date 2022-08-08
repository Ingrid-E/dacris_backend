require('dotenv').config()
const express = require("express")
const app = express()
const pkg = require("../package.json")
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({
        name: pkg.name,
        author: pkg.author,
        description: pkg.description,
        version: pkg.version
    })
})

var origins = {
    origin: ['http://localhost:8080'],
    optionsSuccessStatus: 200,
    credentials: false
}

app.use(cors(origins))


//Routes
const userRoute = require('./routes/Users')
app.use('/users',userRoute)
const productRoute = require('./routes/Products/Products')
app.use('/product',productRoute)
const categoryRoute = require('./routes/Products/Categories')
app.use('/category',categoryRoute)
const imageRoute = require('./routes/Products/Images')
app.use('/image',imageRoute)
const discountRoute = require('./routes/Products/Discounts')
app.use('/discount',discountRoute)
const product_discount = require('./routes/Products/ProductDiscount')
app.use('/product_discount',product_discount)



module.exports = app