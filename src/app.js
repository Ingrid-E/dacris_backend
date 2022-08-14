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
    origin: ['http://localhost:3000'],
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
app.use('/product_category',categoryRoute)

const imageRoute = require('./routes/Products/Images')
app.use('/product_images',imageRoute)

const newRoute = require('./routes/Products/NewProducts')
app.use('/new_products',newRoute)

const bestRoute = require('./routes/Products/BestSellers')
app.use('/best_sellers',bestRoute)

const discountRoute = require('./routes/Products/Discounts')
app.use('/product/discount',discountRoute)

const product_discount = require('./routes/Products/ProductDiscount')
app.use('/product/product_discount',product_discount)

const s3_images = require('./routes/Images/S3_Images')
app.use('/s3_image',s3_images)




module.exports = app