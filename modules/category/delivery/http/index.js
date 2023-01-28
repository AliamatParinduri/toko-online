const { auth } = require("../../../../middlewares/auth")
const categoryController = require("./categoryController")

module.exports = async (app, express, usecase) => {
  // function

  // route
  const router = express.Router()

  const cc = categoryController(usecase)

  router.get("/", auth, cc.getCategories)

  router.get("/:id", auth, cc.getCategoryById)

  router.post("/", auth, cc.createCategory)

  router.put("/:id", auth, cc.updateCategory)

  router.delete("/:id", auth, cc.deleteCategory)

  app.use("/api/v1/categories", router)

  return module
}
