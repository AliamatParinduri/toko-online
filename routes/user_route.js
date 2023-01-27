const express = require("express")

const uc = require("../controllers/user_controller")

const router = express.Router()

router.get("/", uc.getUsers)

router.get("/:id", uc.getUserById)

router.post("/", uc.createUser)

router.put("/:id", uc.updateUser)

router.delete("/:id",uc.deleteUser)

module.exports = router
