const express = require('express')
const router = express.Router()
const controller = require('../controllers/ImageController')


router.get("/", controller.image_get)
router.post("/", controller.image_create_post)


module.exports = router