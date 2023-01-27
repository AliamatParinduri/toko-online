const knex = require("../../knex")
const { responseError } = require("../helper/responseMessages")

exports.getProducts = async (req, res, next) => {
  try {
    const products = await knex("products")

    if (products.length < 1) {
      return responseError(next, 404, "data product tidak ditemukan")
    }

    res.status(200).send({
      message: "success mendapatkan data product",
      data: products,
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await knex("products").where("id", id).first()

    if (!product) {
      return responseError(next, 404, "data product tidak ditemukan")
    }

    res.status(200).send({
      message: "success mendapatkan data product",
      data: product,
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.createProduct = async (req, res, next) => {
  try {
    const data = req.body

    if (data.price == 0 || data.price < 0) {
      return responseError(next, 400, "price tidak valid")
    }

    const checkProduct = await knex("products").where("name", data.name).first()

    if (checkProduct) {
      return responseError(next, 400, "nama product sudah digunakan")
    }

    await knex("products").insert({
      name: data.name,
      description: data.description,
      price: data.price,
      qty: data.qty,
      image: data.image,
    })

    res.status(201).send({
      message: "Success tambah data product",
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        qty: data.qty,
        image: data.image,
      },
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const data = req.body
    const { id } = req.params

    const checkProduct = await knex("products")
      .where("name", data.name)
      .whereNot("id", id)
      .first()

    if (checkProduct) {
      return responseError(next, 400, "nama product sudah digunakan")
    }

    await knex("products").where("id", id).update({
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
    })

    res.status(200).send({
      message: "Success update data product",
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        qty: data.qty,
        image: data.image,
      },
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await knex("products").where("id", id).del()

    if (product == 0) {
      return responseError(next, 400, "product tidak ditemukan")
    }

    res.status(200).send({
      message: "Success delete data product",
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}
