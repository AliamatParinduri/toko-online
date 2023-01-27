const knex = require("../../knex")
const { passwordCompare, generateToken } = require("../utils/authentication")

exports.register = async (req, res, next) => {
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

exports.login = async (req, res, next) => {
  try {
    const data = req.body

    const user = await knex("users").where("email", data.email).first()

    const passwordCheck = await passwordCompare(data.password, user.password)
    if (!passwordCheck) {
      return res.status(400).send({
        message: "Email atau Password salah",
      })
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
    })

    res.status(200).send({
      message: "Berhasil Login",
      data: user,
      token,
    })
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}
