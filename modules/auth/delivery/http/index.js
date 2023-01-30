const { auth } = require("../../../../middlewares/auth")
const authController = require("./authController")

module.exports = async (app, express, usecase) => {
  // route
  const router = express.Router()

  const ac = authController(usecase)

  router.post("/login", ac.login)

  router.post("/register", ac.register)

  app.use("/api/v1/auth", router)

  return module
}
