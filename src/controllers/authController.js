const knex = require("../../knex")
const { passwordCompare, generateToken } = require("../utils/authentication")

exports.register = async (req, res, next) => {
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

exports.login = async (req, res, next) => {
  try {
    const data = req.body

    const user = await knex("users").where("email", data.email).first()
    if (!user) {
      return responseError(next, 400, "Email atau Password salah")
    }

    const passwordCheck = await passwordCompare(data.password, user.password)
    if (!passwordCheck) {
      return responseError(next, 400, "Email atau Password salah")
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
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}
