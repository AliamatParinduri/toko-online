const express = require("express")

const cc = require("../controllers/categoryController")
const { auth } = require("../middlewares/auth")

const router = express.Router()

router.get("/", auth, cc.getCategories)

router.get("/:id", auth, cc.getCategoryById)

router.post("/", auth, cc.createCategory)

router.put("/:id", auth, cc.updateCategory)

router.delete("/:id", auth, cc.deleteCategory)

module.exports = router
