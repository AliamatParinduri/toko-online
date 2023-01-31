const { responseError } = require("../../../../helper/responseMessages")

module.exports = (usecase) => {
  module.getProfile = async (req, res, next) => {
    try {
      const payload = {
        id: req.user.id,
        type: req.user.type,
      }
      const profile = await usecase.getProfile(payload)

      if (!profile) {
        return responseError(next, 404, "Profile tidak ditemukan")
      }

      return res.status(200).send({
        message: "Success mendapatkan data profile",
        data: profile,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.updateCustomerProfile = async (req, res, next) => {
    try {
      const data = req.body
      const userId = req.user.id

      const payload = {
        name: data.name,
        phone: data.phone,
        profilePicture: data.profilePicture,
      }

      const profile = await usecase.updateCustomerProfile(userId, payload)

      if (profile == 0) {
        return responseError(next, 500, "Gagal update data profile")
      }

      res.status(200).send({
        message: "Success update data profile",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.updatePassword = async (req, res, next) => {
    try {
      const data = req.body
      const userId = req.user.id
      const updatePw = await usecase.updatePassword(userId, data.newPassword)

      if (updatePw == 0) {
        return responseError(next, 500, "Gagal update password")
      }

      res.status(200).send({
        message: "Success update password",
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
