const express = require("express")

const ac = require('../controllers/auth_controller')

const router = express.Router()

router.post("/register", ac.register)

router.post("/login", ac.login)

module.exports = router
