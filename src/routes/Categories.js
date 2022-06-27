const express = require('express')
const router = express.Router()
const controller = require('../controllers/CategoryController')


router.get("/", controller.category_all_get)
router.get("/:category_id", controller.category_get)
router.delete("/:category_id", controller.category_del)
router.put("/:category_id", controller.category_update_put)
router.post("/", controller.category_create_post)


module.exports = router