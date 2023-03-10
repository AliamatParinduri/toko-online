const { auth } = require("../../../../middlewares/auth")
const couponController = require("./couponController")

module.exports = async (app, express, usecase) => {
  // route
  const router = express.Router()

  const cc = couponController(usecase)

  router.get("/", auth, cc.getCouponsByUser)

  router.get("/:id", auth, cc.getCouponById)

  router.post("/", auth, cc.createCoupon)

  router.put("/:id", auth, cc.updateCoupon)

  router.delete("/:id", auth, cc.deleteCoupon)

  app.use("/api/v1/coupons", router)

  return module
}
