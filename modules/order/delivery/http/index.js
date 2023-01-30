const { auth } = require("../../../../middlewares/auth")
const orderController = require("./orderController")

module.exports = async (app, express, usecase) => {
  // route
  const router = express.Router()

  const oc = orderController(usecase)

  router.get("/orders", auth, oc.getAllOrdersByUsersId)

  router.post("/checkout", auth, oc.checkout)

  app.use("/api/v1/", router)

  return module
}
