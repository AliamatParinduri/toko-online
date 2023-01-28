const { responseError } = require("../../../../helper/responseMessages")

module.exports = (usecase) => {
  module.getCoupons = async (req, res, next) => {
    try {
      const coupons = await usecase.getCoupons()

      if (coupons.length < 1) {
        return responseError(next, 404, "Coupon tidak ditemukan")
      }

      return res.status(200).send({
        message: "Success mendapatkan data coupon",
        data: coupons,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.getCouponById = async (req, res, next) => {
    try {
      const { id } = req.params

      const coupon = await usecase.getCouponById(id)

      if (!coupon) {
        return responseError(next, 404, "Coupon tidak ditemukan")
      }

      res.status(200).send({
        message: "Success mendapatkan data coupon",
        data: coupon,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.createCoupon = async (req, res, next) => {
    try {
      const data = req.body

      const checkCoupon = await usecase.getCouponByAttribute("code", data.code)

      if (checkCoupon) {
        return responseError(next, 400, "Coupon sudah digunakan")
      }

      const payload = { code: data.code, description: data.description }
      const coupon = await usecase.createcoupon(payload)

      if (!coupon) {
        return responseError(next, 500, "Gagal tambah data coupon")
      }

      res.status(201).send({
        message: "Success tambah data coupon",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.updateCoupon = async (req, res, next) => {
    try {
      const data = req.body
      const { id } = req.params

      const couponById = await usecase.getCouponById(id)
      if (!couponById) {
        return responseError(next, 400, "Coupon tidak ditemukan")
      }

      const checkCoupon = await usecase.getCouponByAttrWhereNot(
        "code",
        data.code,
        "id",
        id
      )

      if (checkCoupon) {
        return responseError(next, 400, "Coupon sudah digunakan")
      }

      const payload = { code: data.code, description: data.description }

      const coupon = await usecase.updateCoupon(id, payload)

      if (coupon == 0) {
        return responseError(next, 500, "Gagal update data coupon")
      }

      res.status(200).send({
        message: "Success update data coupon",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.deleteCoupon = async (req, res, next) => {
    try {
      const { id } = req.params

      const couponById = await usecase.getCouponById(id)
      if (!couponById) {
        return responseError(next, 400, "Coupon tidak ditemukan")
      }

      const coupon = await await usecase.deleteCoupon()

      if (coupon == 0) {
        return responseError(next, 500, "Gagal delete data coupon")
      }

      res.status(200).send({
        message: "Success delete data coupon",
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
