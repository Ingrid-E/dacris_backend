const express = require('express')
const router = express.Router()
const controller = require("../../controllers/Products/BestSellersController")
const pagination = require('../../middleware/pagination')


router.get("/pagination", pagination.bestSellers_filterPagination(), controller.bestsellers_pagination_get)
router.get("/", controller.bestsellers_all_get)
router.get("/:product_id", controller.bestsellers_get)
router.delete("/:product_id", controller.bestsellers_del)
router.post("/", controller.bestsellers_create_post)


module.exports = router