const express = require('express')
const router = express.Router()
const controller = require('../../controllers/Products/ImageController')


router.get("/", controller.image_all_get)
router.get("/:product_id", controller.image_get)
router.delete("/:image_id", controller.image_del)
router.put("/:image_id", controller.image_update_put)
router.post("/", controller.image_create_post)


module.exports = router