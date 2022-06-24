const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductController')


router.get("/", controller.product_all_get)
router.post("/", controller.product_create_post)


module.exports = router