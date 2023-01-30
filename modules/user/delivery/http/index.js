const { auth } = require("../../../../middlewares/auth")
const userController = require("./userController")

module.exports = async (app, express, usecase) => {
  // route
  const router = express.Router()

  const uc = userController(usecase)

  router.get("/", auth, uc.getUsers)

  router.get("/:id", auth, uc.getUserById)

  router.post("/", auth, uc.createUser)

  router.put("/:id", auth, uc.updateUser)

  router.delete("/:id", auth, uc.deleteUser)

  app.use("/api/v1/users", router)

  return module
}
