const { responseError } = require("../../../../helper/responseMessages")

module.exports = (usecase) => {
  module.getProducts = async (req, res, next) => {
    try {
      const payload = {
        perPage: req.query.perPage || 5,
        currentPage: req.query.currentPage || 1,
      }
      const product = await usecase.getProducts(payload)

      if (product.length < 1) {
        return responseError(next, 404, "Product tidak ditemukan")
      }

      return res.status(200).send({
        message: "Success mendapatkan data Product",
        data: product,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.getProductById = async (req, res, next) => {
    try {
      const { id } = req.params

      const product = await usecase.getProductById(id)

      if (!product) {
        return responseError(next, 404, "Product tidak ditemukan")
      }

      res.status(200).send({
        message: "Success mendapatkan data product",
        data: product,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.createProduct = async (req, res, next) => {
    try {
      const data = req.body

      if (data.price == 0 || data.price < 0) {
        return responseError(next, 400, "Price tidak valid")
      }

      const checkProduct = await usecase.getProductByAttribute(
        "name",
        data.name
      )

      if (checkProduct) {
        return responseError(next, 400, "Nama product sudah digunakan")
      }

      const payload = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        image: data.image,
      }
      const product = await usecase.createProduct(payload)

      if (!product) {
        return responseError(next, 500, "Gagal tambah data Product")
      }

      res.status(201).send({
        message: "Success tambah data product",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.updateProduct = async (req, res, next) => {
    try {
      const data = req.body
      const { id } = req.params

      const ProductById = await usecase.getProductById(id)
      if (!ProductById) {
        return responseError(next, 400, "Product tidak ditemukan")
      }

      const checkProduct = await usecase.getProductByAttrWhereNot(
        "name",
        data.name,
        "id",
        id
      )

      if (checkProduct) {
        return responseError(next, 400, "Nama product sudah digunakan")
      }

      const payload = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        image: data.image,
      }

      const product = await usecase.updateProduct(id, payload)

      if (product == 0) {
        return responseError(next, 500, "Gagal update data Product")
      }

      res.status(200).send({
        message: "Success update data product",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params

      const productById = await usecase.getProductById(id)
      if (!productById) {
        return responseError(next, 400, "Product tidak ditemukan")
      }

      const product = await usecase.deleteProduct(id)

      if (product == 0) {
        return responseError(next, 500, "Gagal delete data Product")
      }

      res.status(200).send({
        message: "Success delete data Product",
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
