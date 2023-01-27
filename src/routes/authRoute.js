const express = require("express")

const ac = require('../controllers/authController')

const router = express.Router()

router.post("/register", ac.register)

router.post("/login", ac.login)

module.exports = router
