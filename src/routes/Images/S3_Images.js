const express = require('express')
const router = express.Router()
const controller = require('../../controllers/Images/S3_Images')

router.post("/", controller.image_create_post)

module.exports = router