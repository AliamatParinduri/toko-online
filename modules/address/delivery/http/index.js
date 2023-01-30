const { auth } = require("../../../../middlewares/auth")
const addressController = require("./addressController")

module.exports = async (app, express, usecase) => {
  // route
  const router = express.Router()

  const ac = addressController(usecase)

  router.get("/", auth, ac.getAddresses)

  router.get("/:id", auth, ac.getAddressById)

  router.post("/", auth, ac.createAddress)

  router.put("/:id", auth, ac.updateAddress)

  router.delete("/all", auth, ac.deleteAllAddress)

  router.delete("/:id", auth, ac.deleteAddressById)

  app.use("/api/v1/address", router)

  return module
}
