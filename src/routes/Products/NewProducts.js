const express = require('express')
const router = express.Router()
const controller = require("../../controllers/Products/NewProductController")


router.get("/", controller.newproduct_all_get)
router.get("/:product_id", controller.newproduct_get)
router.delete("/:product_id", controller.newproduct_del)
router.post("/", controller.newproduct_create_post)


module.exports = router