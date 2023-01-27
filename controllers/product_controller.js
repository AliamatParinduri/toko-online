const knex = require("../knex")

exports.getProducts = async (req, res, next) => {
  const products = await knex("products")
  res.send({
    data: products,
  })
}

exports.getProductById = async (req, res, next) => {
  const { id } = req.params
  const product = await knex("products").where("id", id).first()
  res.send({
    data: product,
  })
}

exports.createProduct = async (req, res, next) => {
  const data = req.body
  await knex("products").insert({
    title: data.title,
    description: data.description,
    price: data.price,
    image: data.image,
  })
  res.send({
    message: "Success tambah data product",
  })
}

exports.updateProduct = async (req, res, next) => {
  const data = req.body
  const { id } = req.params
  await knex("products").where("id", id).update({
    title: data.title,
    description: data.description,
    price: data.price,
    image: data.image,
  })
  res.send({
    message: "Success update data product",
  })
}

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params
  await knex("products").where("id", id).del()
  res.send({
    message: "Success delete data product",
  })
}