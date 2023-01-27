const knex = require("../knex")
const { passwordHash } = require("../utils/authentication")

exports.getUsers = async (req, res, next) => {
  const users = await knex("users")
  res.send({
    data: users,
  })
}

exports.getUserById = async (req, res, next) => {
  const { id } = req.params
  const user = await knex("users").where("id", id).first()
  res.send({
    data: user,
  })
}

exports.createUser = async (req, res, next) => {
  const data = req.body
  await knex("users").insert({
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
  })
  res.send({
    message: "Success tambah data product",
  })
}

exports.updateUser = async (req, res, next) => {
  const data = req.body
  const { id } = req.params
  hash = await passwordHash(data.password)
  await knex("users").where("id", id).update({
    name: data.name,
    email: data.email,
    password: hash,
    phone: data.phone,
  })
  res.send({
    message: "Success update data product",
  })
}

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params
  await knex("users").where("id", id).del()
  res.send({
    message: "Success delete data product",
  })
}