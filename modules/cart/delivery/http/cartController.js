const { responseError } = require("../../../../helper/responseMessages")

module.exports = (usecase) => {
  module.getCarts = async (req, res, next) => {
    try {
      if (!req.user) {
        return responseError(
          next,
          401,
          "Anda belum login, Cart tidak ditemukan"
        )
      }

      const userId = req.user.id
      const cart = await usecase.getCarts(userId)

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

      if (!req.user) {
        return responseError(
          next,
          401,
          "Anda belum login, Cart tidak ditemukan"
        )
      }

      const userId = req.user.id
      const cart = await usecase.getCollectionByAttr("carts", id)

      if (cart.user_id !== userId) {
        return responseError(next, 401, "Akses ditolak, unauthorized!")
      }

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

      const checkUser = await usecase.getCollectionByAttr("users", data.user_id)

      if (!checkUser) {
        return responseError(next, 400, "User tidak ditemukan")
      }

      const checkProduct = await usecase.getCollectionByAttr(
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

      const checkExistCart = await usecase.checkExistCart(
        data.product_id,
        data.user_id
      )

      if (!checkExistCart) {
        const cart = await usecase.createCart(payload)
        if (!cart) {
          return responseError(next, 500, "Gagal tambah data cart")
        }
      } else {
        payload.qty += checkExistCart.qty

        const cart = await usecase.updateCart(checkExistCart.id, payload)

        if (cart == 0) {
          return responseError(next, 500, "Gagal update data cart")
        }
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

      const cartById = await usecase.getCollectionByAttr("carts", id)
      if (!cartById) {
        return responseError(next, 400, "cart tidak ditemukan")
      }

      const checkUser = await usecase.getCollectionByAttr("users", data.user_id)

      if (!checkUser) {
        return responseError(next, 400, "User tidak ditemukan")
      }

      const checkProduct = await usecase.getCollectionByAttr(
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

  module.deleteCartById = async (req, res, next) => {
    try {
      const { id } = req.params

      if (!req.user) {
        return responseError(
          next,
          401,
          "Anda belum login, Cart tidak ditemukan"
        )
      }

      const userId = req.user.id
      const cartById = await usecase.getCollectionByAttr("carts", id)

      if (cartById.user_id !== userId) {
        return responseError(next, 401, "Akses ditolak, unauthorized!")
      }

      if (!cartById) {
        return responseError(next, 400, "Cart tidak ditemukan")
      }

      const cart = await usecase.deleteCartById(id)

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

  module.deleteAllCart = async (req, res, next) => {
    try {
      const userId = req.user.id

      const cartById = await usecase.getCollectionByAttr(
        "carts",
        userId,
        "user_id"
      )
      if (!cartById) {
        return responseError(next, 400, "Cart tidak ditemukan")
      }

      const cart = await usecase.deleteCartByAttr("user_id", userId)

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
