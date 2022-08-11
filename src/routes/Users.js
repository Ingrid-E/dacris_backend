const express = require('express')
const router = express.Router()
const controller = require('../controllers/UsersController')
const authJwt = require('../middleware/authJwt')

router.post("/", controller.user_create_post)
//router.post("/login", controller.user_login_post)
router.post("/login", controller.user_join_post)
router.post("/token", controller.user_token_post)
router.delete("/logout", controller.user_token_delete)
module.exports = router