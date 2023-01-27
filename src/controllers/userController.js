const knex = require("../../knex")
const { responseError } = require("../helper/responseMessages")
const { passwordHash } = require("../utils/authentication")

exports.getUsers = async (req, res, next) => {
  try {
    const users = await knex("users")

    if (users.length < 1) {
      return responseError(next, 404, "data user tidak ditemukan")
    }

    res.status(200).send({
      message: "success mendapatkan data user",
      data: users,
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await knex("users").where("id", id).first()

    if (!user) {
      return responseError(next, 404, "data user tidak ditemukan")
    }

    res.status(200).send({
      message: "success mendapatkan data user",
      data: user,
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.createUser = async (req, res, next) => {
  try {
    const data = req.body

    const checkEmail = await knex("users").where("email", data.email).first()
    if (checkEmail) {
      return responseError(next, 400, "email sudah digunakan")
    }

    const checkPhone = await knex("users").where("phone", data.phone).first()
    if (checkPhone) {
      return responseError(next, 400, "no hp sudah digunakan")
    }

    await knex("users").insert({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    })

    res.status(201).send({
      message: "Success tambah data user",
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const data = req.body
    const { id } = req.params

    const checkEmail = await knex("users")
      .where("email", data.email)
      .whereNot("id", id)
      .first()

    if (checkEmail) {
      return responseError(next, 400, "email sudah digunakan")
    }

    const checkPhone = await knex("users")
      .where("phone", data.phone)
      .whereNot("id", id)
      .first()

    if (checkPhone) {
      return responseError(next, 400, "no hp sudah digunakan")
    }

    hash = await passwordHash(data.password)
    await knex("users").where("id", id).update({
      name: data.name,
      email: data.email,
      password: hash,
      phone: data.phone,
    })

    res.status(200).send({
      message: "Success update data user",
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await knex("users").where("id", id).del()

    if (user == 0) {
      return responseError(next, 400, "user tidak ditemukan")
    }

    res.status(200).send({
      message: "Success delete data user",
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}
