const knex = require("../../knex")

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await knex("categories")

    if (categories.length < 1) {
      return responseError(next, 404, "data category tidak ditemukan")
    }

    res.status(200).send({
      message: "success mendapatkan data category",
      data: categories,
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params

    const category = await knex("categories").where("id", id).first()

    if (!category) {
      return responseError(next, 404, "data category tidak ditemukan")
    }

    res.status(200).send({
      message: "success mendapatkan data category",
      data: category,
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.createCategory = async (req, res, next) => {
  try {
    const data = req.body

    const checkCategory = await knex("categories")
      .where("name", data.name)
      .first()

    if (checkCategory) {
      return responseError(next, 404, "category sudah digunakan")
    }

    await knex("categories").insert({
      name: data.name,
    })

    res.status(201).send({
      message: "Success tambah data category",
      data: {
        name: data.name,
      },
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.updateCategory = async (req, res, next) => {
  try {
    const data = req.body
    const { id } = req.params

    const checkCategory = await knex("categories")
      .where("name", data.name)
      .whereNot("id", id)
      .first()

    if (checkCategory) {
      return responseError(next, 404, "category sudah digunakan")
    }

    await knex("categories").where("id", id).update({
      name: data.name,
    })

    res.status(200).send({
      message: "Success update data category",
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params

    const category = await knex("categories").where("id", id).del()

    if (category == 0) {
      return responseError(next, 400, "category tidak ditemukan")
    }

    res.status(200).send({
      message: "Success delete data category",
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}
