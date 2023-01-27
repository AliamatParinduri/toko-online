const express = require("express")

const pc = require('../controllers/product_controller')
const { auth } = require("../middlewares/auth")

const router = express.Router()

router.get("/", auth, pc.getProducts)

router.get("/:id", auth, pc.getProductById)

router.post("/", auth, pc.createProduct)

router.put("/:id", auth, pc.updateProduct)

router.delete("/:id", auth, pc.deleteProduct)

module.exports = router
