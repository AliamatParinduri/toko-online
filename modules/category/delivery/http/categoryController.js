const { responseError } = require("../../../../helper/responseMessages")

module.exports = (usecase) => {
  module.getCategories = async (req, res, next) => {
    try {
      const payload = {
        perPage: req.query.perPage || 5,
        currentPage: req.query.currentPage || 1,
      }
      const categories = await usecase.getCategories(payload)

      if (categories.length < 1) {
        return responseError(next, 404, "Data category tidak ditemukan")
      }

      return res.status(200).send({
        message: "Success mendapatkan data category",
        data: categories,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.getCategoryById = async (req, res, next) => {
    try {
      const { id } = req.params

      const category = await usecase.getCategoryById(id)

      if (!category) {
        return responseError(next, 404, "Data category tidak ditemukan")
      }

      res.status(200).send({
        message: "Success mendapatkan data category",
        data: category,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.createCategory = async (req, res, next) => {
    try {
      const data = req.body

      const checkCategory = await usecase.getCategoryByAttribute(
        "name",
        data.name
      )

      if (checkCategory) {
        return responseError(next, 400, "Category sudah digunakan")
      }

      const payload = { name: data.name }
      const category = await usecase.createCategory(payload)

      if (!category) {
        return responseError(next, 500, "Gagal tambah data category")
      }

      res.status(201).send({
        message: "Success tambah data category",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.updateCategory = async (req, res, next) => {
    try {
      const data = req.body
      const { id } = req.params

      const categoryById = await usecase.getCategoryById(id)
      if (!categoryById) {
        return responseError(next, 400, "Data category tidak ditemukan")
      }

      const checkCategory = await usecase.getCategoryByAttrWhereNot(
        "name",
        data.name,
        "id",
        id
      )

      if (checkCategory) {
        return responseError(next, 400, "Category sudah digunakan")
      }

      const payload = { name: data.name }

      const category = await usecase.updateCategory(id, payload)

      if (category == 0) {
        return responseError(next, 500, "Gagal update data category")
      }

      res.status(200).send({
        message: "Success update data category",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.deleteCategory = async (req, res, next) => {
    try {
      const { id } = req.params

      const categoryById = await usecase.getCategoryById(id)
      if (!categoryById) {
        return responseError(next, 400, "Data category tidak ditemukan")
      }

      const category = await usecase.deleteCategory()

      if (category == 0) {
        return responseError(next, 500, "Gagal delete data category")
      }

      res.status(200).send({
        message: "Success delete data category",
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
