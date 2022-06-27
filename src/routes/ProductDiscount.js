const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductDiscountController')


router.get("/", controller.product_discount_all_get)
router.get("/:discount_id", controller.product_discount_get)
router.delete("/:product_discount_id", controller.product_discount_del)
router.put("/:product_discount_id", controller.product_discount_update_put)
router.post("/", controller.product_discount_create_post)


module.exports = router