const express = require("express")

const knex = require("../knex")

const router = express.Router()

router.get("/", async (req, res, next) => {
  const users = await knex("users")
  res.send({
    data: users,
  })
})

router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  const user = await knex("users").where("id", id).first()
  res.send({
    data: user,
  })
})

router.post("/", async (req, res, next) => {
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
})

router.put("/:id", async (req, res, next) => {
  const data = req.body
  const { id } = req.params
  await knex("users").where("id", id).update({
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
  })
  res.send({
    message: "Success update data product",
  })
})

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params
  await knex("users").where("id", id).del()
  res.send({
    message: "Success delete data product",
  })
})

module.exports = router
