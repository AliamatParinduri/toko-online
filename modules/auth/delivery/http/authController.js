const { responseError } = require("../../../../helper/responseMessages")
const {
  passwordHash,
  passwordCompare,
  generateToken,
} = require("../../../../utils/authentication")

module.exports = (usecase) => {
  module.register = async (req, res, next) => {
    try {
      const data = req.body

      const checkEmail = await usecase.getUserByAttribute("email", data.email)

      if (checkEmail) {
        return responseError(next, 400, "Email sudah digunakan")
      }

      const checkPhone = await usecase.getUserByAttribute("phone", data.phone)

      if (checkPhone) {
        return responseError(next, 400, "No Handphone sudah digunakan")
      }

      const hash = await passwordHash(data.password)
      const payload = {
        name: data.name,
        email: data.email,
        password: hash,
        phone: data.phone,
      }
      const User = await usecase.createUser(payload)

      if (!User) {
        return responseError(next, 500, "Gagal tambah data User")
      }

      res.status(201).send({
        message: "Success tambah data User",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.login = async (req, res, next) => {
    try {
      const data = req.body

      const user = await await usecase.getUserByAttribute(
        "email",
        data.email,
        data.type
      )
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
        type: user.type,
      })

      res.status(200).send({
        message: "Berhasil Login",
        token,
        data: user,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
