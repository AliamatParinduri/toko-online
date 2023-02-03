const { responseError } = require("../../../../helper/responseMessages")

module.exports = (usecase) => {
  module.getAllOrdersByCustomer = async (req, res, next) => {
    try {
      if (req.user.type != "customers") {
        return responseError(next, 401, "Akses ditolak, unauthorized!")
      }
      const typeId = req.user.type_id
      const payload = {
        perPage: req.query.perPage || 5,
        currentPage: req.query.currentPage || 1,
      }
      const orders = await usecase.getAllOrdersByCustomer(typeId, payload)
      if (orders.data.length < 1) {
        return responseError(next, 400, "order tidak ditemukan")
      }
      res.status(200).send({
        message: "Success mendapatkan data order",
        ...orders,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.checkout = async (req, res, next) => {
    try {
      const data = req.body
      const type = req.user.type_id

      if (data.coupon_id) {
        const checkCoupon = await usecase.getCouponByAttribute(
          "id",
          data.coupon_id
        )

        if (!checkCoupon) {
          return responseError(next, 400, "Coupon tidak ditemukan")
        }
      }

      const checkDataCart = await usecase.checkDataCart(data.cart)
      if (data.cart.length !== checkDataCart) {
        return responseError(next, 400, "Data cart tidak valid")
      }

      const checkTotalPrice = await usecase.checkTotalPrice(data)
      if (!checkTotalPrice) {
        return responseError(
          next,
          400,
          "Total price tidak valid, silahkan cek kembali total harga seluruhnya"
        )
      }

      if (data.coupon_id) {
        const checkCouponUsed = await usecase.getCouponUsedByAttribute(
          "coupon_id",
          data.coupon_id
        )

        if (checkCouponUsed) {
          return responseError(next, 400, "Coupon sudah digunakan")
        }
      }

      const checkStockProduct = await usecase.checkStockProduct(data.cart)
      if (checkStockProduct.length < 1) {
        return responseError(
          next,
          400,
          "Error, quantity lebih besar dari stock product"
        )
      }

      const updateStockProduct = await usecase.updateStockProduct(
        checkStockProduct
      )
      if (updateStockProduct == 0) {
        return responseError(
          next,
          500,
          "Gagal melakukan update data Stock Product"
        )
      }

      const payload = {
        customer_id: type,
        address_id: data.address_id,
        coupon_id: data.coupon_id,
        cart: data.cart,
        total: data.total,
      }

      const checkout = await usecase.checkout(payload)
      if (!checkout) {
        return responseError(next, 500, "Gagal melakukan checkout")
      }

      const deleteCart = await usecase.deleteCart(data.cart)
      if (!deleteCart) {
        return responseError(next, 500, "Gagal melakukan delete data pada cart")
      }

      res.status(201).send({
        message: "Success melakukan checkout",
        data: payload,
      })
    } catch (error) {
      console.log(error)
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
