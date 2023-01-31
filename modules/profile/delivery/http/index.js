const { auth } = require("../../../../middlewares/auth")
const profileController = require("./profileController")

module.exports = async (app, express, usecase) => {
  // route
  const router = express.Router()

  const pc = profileController(usecase)

  router.get("/profile/customer", auth, pc.getProfile)

  router.put("/profile/customer", auth, pc.updateCustomerProfile)

  router.patch("/update-password/customer", auth, pc.updatePassword)

  app.use("/api/v1", router)

  return module
}
