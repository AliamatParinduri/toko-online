const express = require("express")

const uc = require("../controllers/userController")
const { auth } = require("../middlewares/auth")

const router = express.Router()

router.get("/", auth, uc.getUsers)

router.get("/:id", auth, uc.getUserById)

router.post("/", auth, uc.createUser)

router.put("/:id", auth, uc.updateUser)

router.delete("/:id", auth, uc.deleteUser)

module.exports = router
