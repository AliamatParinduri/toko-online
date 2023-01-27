const knex = require("../../knex")
const { passwordHash } = require("../utils/authentication")

exports.getUsers = async (req, res, next) => {
  try {
    const users = await knex("users")

    if (users.length < 1) {
      return res.status(404).send({
        message: "data user tidak ditemukan",
      })
    }

    res.status(200).send({
      message: "success mendapatkan data user",
      data: users,
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).send({
        message: "parameter tidak ditemukan",
      })
    }

    const user = await knex("users").where("id", id).first()

    if (!user) {
      return res.status(404).send({
        message: "data user tidak ditemukan",
      })
    }

    res.status(200).send({
      message: "success mendapatkan data user",
      data: user,
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}

exports.createUser = async (req, res, next) => {
  try {
    const data = req.body

    await knex("users").insert({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    })

    const checkEmail = await knex("users").where("email", data.email).first()
    if (checkEmail) {
      return res.status(400).send({
        message: "email sudah ada yang menggunakan",
      })
    }

    const checkPhone = await knex("users").where("phone", data.phone).first()
    if (checkPhone) {
      return res.status(400).send({
        message: "phone sudah ada yang menggunakan",
      })
    }

    res.status(201).send({
      message: "Success tambah data product",
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const data = req.body
    const { id } = req.params

    if (!id) {
      res.status(400).send({
        message: "parameter tidak ditemukan",
      })
    }

    const checkEmail = await knex("users")
      .where("email", data.email)
      .whereNot("id", id)
      .first()
    if (checkEmail) {
      return res.status(400).send({
        message: "email sudah ada yang menggunakan",
      })
    }

    const checkPhone = await knex("users")
      .where("phone", data.phone)
      .whereNot("id", id)
      .first()
    if (checkPhone) {
      return res.status(400).send({
        message: "phone sudah ada yang menggunakan",
      })
    }

    hash = await passwordHash(data.password)
    await knex("users").where("id", id).update({
      name: data.name,
      email: data.email,
      password: hash,
      phone: data.phone,
    })

    res.status(200).send({
      message: "Success update data product",
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).send({
        message: "parameter tidak ditemukan",
      })
    }

    await knex("users").where("id", id).del()

    res.status(200).send({
      message: "Success delete data product",
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}
