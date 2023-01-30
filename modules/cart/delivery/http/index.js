const { auth } = require("../../../../middlewares/auth")
const cartController = require("./cartController")

module.exports = async (app, express, usecase) => {
  // route
  const router = express.Router()

  const cc = cartController(usecase)

  router.get("/", auth, cc.getCarts)

  router.get("/:id", auth, cc.getCartById)

  router.post("/", auth, cc.createCart)

  router.put("/:id", auth, cc.updateCart)

  router.delete("/all", auth, cc.deleteAllCart)

  router.delete("/:id", auth, cc.deleteCartById)

  app.use("/api/v1/carts", router)

  return module
}
