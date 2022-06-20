const express = require('express')
const router = express.Router()
const controller = require('../controllers/CategoryController')


router.get("/", controller.category_get)
router.post("/", controller.category_create_post)


module.exports = router