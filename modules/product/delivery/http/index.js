const { auth } = require("../../../../middlewares/auth")
const productController = require("./productController")

module.exports = async (app, express, usecase) => {
  // function

  // route
  const router = express.Router()

  const pc = productController(usecase)

  router.get("/", auth, pc.getProducts)

  router.get("/:id", auth, pc.getProductById)

  router.post("/", auth, pc.createProduct)

  router.put("/:id", auth, pc.updateProduct)

  router.delete("/:id", auth, pc.deleteProduct)

  app.use("/api/v1/Products", router)

  return module
}
