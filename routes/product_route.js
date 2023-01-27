const express = require("express")

const pc = require('../controllers/product_controller')

const router = express.Router()

router.get("/", pc.getProducts)

router.get("/:id", pc.getProductById)

router.post("/", pc.createProduct)

router.put("/:id", pc.updateProduct)

router.delete("/:id", pc.deleteProduct)

module.exports = router
