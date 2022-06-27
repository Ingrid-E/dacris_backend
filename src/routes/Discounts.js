const express = require('express')
const router = express.Router()
const controller = require('../controllers/DiscountController')


router.get("/", controller.discount_all_get)
router.get("/:discount_id", controller.discount_get)
router.delete("/:discount_id", controller.discount_del)
router.put("/:discount_id", controller.discount_update_put)
router.post("/", controller.discount_create_post)


module.exports = router