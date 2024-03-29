const express = require('express')
const router = express.Router()
const controller = require("../../controllers/Products/ProductController")
const pagination = require('../../middleware/pagination')


router.get("/pagination",pagination.product_filterPagination(),controller.product_pagination_get)
router.get("/", controller.product_all_get)
router.get("/:product_id", controller.product_get)
router.delete("/:product_id", controller.product_del)
router.put("/:product_id", controller.product_update_put)
router.post("/", controller.product_create_post)
router.post("/filter", controller.products_filter_post)


module.exports = router