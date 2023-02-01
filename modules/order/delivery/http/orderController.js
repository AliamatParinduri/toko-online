const { responseError } = require("../../../../helper/responseMessages")

module.exports = (usecase) => {
  module.getAllOrdersByUsersId = async (req, res, next) => {
    try {
      const userId = req.user.id
      const payload = {
        perPage: req.query.perPage || 5,
        currentPage: req.query.currentPage || 1,
      }
      const data = await usecase.getAllOrdersByUsersId(userId, payload)
      res.status(200).send({
        message: "Success mendapatkan data order",
        data,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.checkout = async (req, res, next) => {
    try {
      const data = req.body
      const userId = req.user.id
      const payload = {
        user_id: userId,
        address_id: data.address_id,
        coupon_id: data.coupon_id,
        cart: data.cart,
        total: data.total,
      }

      const checkout = await usecase.checkout(payload)
      if (!checkout) {
        return responseError(next, 500, "Gagal melakukan checkout")
      }

      res.status(201).send({
        message: "Success melakukan checkout",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
