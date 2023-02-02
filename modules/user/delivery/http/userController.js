const { responseError } = require("../../../../helper/responseMessages")
const { passwordHash } = require("../../../../utils/authentication")

module.exports = (usecase) => {
  module.getUsers = async (req, res, next) => {
    try {
      const payload = {
        perPage: req.query.perPage || 5,
        currentPage: req.query.currentPage || 1,
      }
      const user = await usecase.getUsers(req.url, payload)

      if (user.length < 1) {
        return responseError(next, 404, "User tidak ditemukan")
      }

      return res.status(200).send({
        message: "Success mendapatkan data user",
        ...user,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.getUserById = async (req, res, next) => {
    try {
      const { id, type } = req.params

      if (!(type == "customers" || type == "employees" || type == "stores")) {
        return responseError(next, 400, "Error, parameter type user tidak ada")
      }

      const user = await usecase.getUserById(type, id)
      if (!user) {
        return responseError(next, 404, "User tidak ditemukan")
      }

      delete data.user_id
      res.status(200).send({
        message: "Success mendapatkan data user",
        data: user,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.createUser = async (req, res, next) => {
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

  module.updateUser = async (req, res, next) => {
    try {
      const data = req.body
      const { id, type } = req.params

      const userById = await usecase.getUserById(type, id)
      if (!userById) {
        return responseError(next, 400, "User tidak ditemukan")
      }

      const checkEmail = await usecase.getUserByAttrWhereNot(
        "email",
        data.email,
        "id",
        id,
        type
      )

      if (checkEmail) {
        return responseError(next, 400, "Email sudah digunakan")
      }

      const checkPhone = await usecase.getUserByAttrWhereNot(
        "phone",
        data.phone,
        "id",
        id,
        type
      )

      if (checkPhone) {
        return responseError(next, 400, "Phone sudah digunakan")
      }

      const hash = await passwordHash(data.password)
      const payload = {
        name: data.name,
        email: data.email,
        password: hash,
        phone: data.phone,
        user_id: userById.data.user_id,
      }

      const User = await usecase.updateUser(id, payload)
      if (User == 0) {
        return responseError(next, 500, "Gagal update data User")
      }

      delete payload.password
      delete payload.user_id
      res.status(200).send({
        message: "Success update data User",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.deleteUser = async (req, res, next) => {
    try {
      const { id, type } = req.params

      const userById = await usecase.getUserById(type, id)
      if (!userById) {
        return responseError(next, 400, "User tidak ditemukan")
      }

      const user = await usecase.deleteUser(id, userById.data.user_id, type)
      if (user == 0) {
        return responseError(next, 500, "Gagal delete data User")
      }

      res.status(200).send({
        message: "Success delete data User",
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
