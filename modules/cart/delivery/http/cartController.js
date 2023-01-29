const { responseError } = require("../../../../helper/responseMessages")

module.exports = (usecase) => {
  module.getCarts = async (req, res, next) => {
    try {
      const cart = await usecase.getCarts()

      if (cart.length < 1) {
        return responseError(next, 404, "Cart tidak ditemukan")
      }

      return res.status(200).send({
        message: "Success mendapatkan data cart",
        data: cart,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.getCartById = async (req, res, next) => {
    try {
      const { id } = req.params

      const cart = await usecase.getCollectionById("carts", id)

      if (!cart) {
        return responseError(next, 404, "Cart tidak ditemukan")
      }

      res.status(200).send({
        message: "Success mendapatkan data cart",
        data: cart,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.createCart = async (req, res, next) => {
    try {
      const data = req.body

      const checkUser = await usecase.getCollectionById("users", data.user_id)

      if (!checkUser) {
        return responseError(next, 400, "User tidak ditemukan")
      }

      const checkProduct = await usecase.getCollectionById(
        "products",
        data.product_id
      )

      if (!checkProduct) {
        return responseError(next, 400, "Product tidak ditemukan")
      }

      const payload = {
        user_id: data.user_id,
        product_id: data.product_id,
        qty: data.qty,
      }
      const cart = await usecase.createCart(payload)

      if (!cart) {
        return responseError(next, 500, "Gagal tambah data cart")
      }

      res.status(201).send({
        message: "Success tambah data cart",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.updateCart = async (req, res, next) => {
    try {
      const data = req.body
      const { id } = req.params

      const cartById = await usecase.getCollectionById("carts", id)
      if (!cartById) {
        return responseError(next, 400, "cart tidak ditemukan")
      }

      const checkUser = await usecase.getCollectionById("users", data.user_id)

      if (!checkUser) {
        return responseError(next, 400, "User tidak ditemukan")
      }

      const checkProduct = await usecase.getCollectionById(
        "products",
        data.product_id
      )

      if (!checkProduct) {
        return responseError(next, 400, "Product tidak ditemukan")
      }

      const payload = {
        user_id: data.user_id,
        product_id: data.product_id,
        qty: data.qty,
      }

      const cart = await usecase.updateCart(id, payload)

      if (cart == 0) {
        return responseError(next, 500, "Gagal update data cart")
      }

      res.status(200).send({
        message: "Success update data cart",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.deleteCart = async (req, res, next) => {
    try {
      const { id } = req.params

      const cartById = await usecase.getCollectionById("carts", id)
      if (!cartById) {
        return responseError(next, 400, "Cart tidak ditemukan")
      }

      const cart = await usecase.deleteCart(id)

      if (cart == 0) {
        return responseError(next, 500, "Gagal delete data cart")
      }

      res.status(200).send({
        message: "Success delete data cart",
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
