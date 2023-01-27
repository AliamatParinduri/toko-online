const express = require("express")

const cc = require("../controllers/couponController")
const { auth } = require("../middlewares/auth")

const router = express.Router()

router.get("/", cc.getCoupons)

router.get("/:id", cc.getCouponById)

router.post("/", cc.createCoupon)

router.put("/:id", cc.updateCoupon)

router.delete("/:id", cc.deleteCoupon)

module.exports = router
