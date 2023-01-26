const express = require("express")
const knex = require("../knex")

const router = express.Router()

router.get("/", async (req, res, next) => {
  const products = await knex("products")
  res.send({
    data: products,
  })
})

router.get("/:id", async (req, res, next) => {
  const { id } = req.params
  const product = await knex("products").where("id", id).first()
  res.send({
    data: product,
  })
})

router.post("/", async (req, res, next) => {
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
})

router.put("/:id", async (req, res, next) => {
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
})

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params
  await knex("products").where("id", id).del()
  res.send({
    message: "Success delete data product",
  })
})

module.exports = router
