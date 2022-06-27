const express = require('express')
const router = express.Router()
const controller = require("../controllers/ProductController")


router.get("/", controller.product_all_get)
router.get("/:product_id", controller.product_get)
router.delete("/:product_id", controller.product_del)
router.put("/:product_id", controller.product_update_put)
router.post("/", controller.product_create_post)


module.exports = router