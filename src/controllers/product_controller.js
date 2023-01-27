const knex = require("../../knex")

exports.getProducts = async (req, res, next) => {
  try {
    const products = await knex("products")

    if (products.length < 1) {
      return res.status(404).send({
        message: "data product tidak ditemukan",
      })
    }

    res.status(200).send({
      message: "success mendapatkan data product",
      data: products,
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).send({
        message: "parameter tidak ditemukan",
      })
    }

    const product = await knex("products").where("id", id).first()

    if (!product) {
      return res.status(404).send({
        message: "data product tidak ditemukan",
      })
    }

    res.status(200).send({
      message: "success mendapatkan data product",
      data: product,
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}

exports.createProduct = async (req, res, next) => {
  try {
    const data = req.body

    if (data.price == 0 || data.price < 0) {
      return res.status(400).send({
        message: "price tidak valid",
      })
    }

    await knex("products").insert({
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.image,
    })

    res.status(201).send({
      message: "Success tambah data product",
      data: {
        name: data.title,
        description: data.description,
        price: data.price,
        qty: data.qty,
        image: data.image,
      },
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const data = req.body
    const { id } = req.params

    if (!id) {
      res.status(400).send({
        message: "parameter tidak ditemukan",
      })
    }

    await knex("products").where("id", id).update({
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.image,
    })

    res.status(200).send({
      message: "Success update data product",
      data: {
        name: data.title,
        description: data.description,
        price: data.price,
        qty: data.qty,
        image: data.image,
      },
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).send({
        message: "parameter tidak ditemukan",
      })
    }

    await knex("products").where("id", id).del()

    res.status(200).send({
      message: "Success delete data product",
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}
