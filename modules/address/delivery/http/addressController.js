const { responseError } = require("../../../../helper/responseMessages")

module.exports = (usecase) => {
  module.getAddresses = async (req, res, next) => {
    try {
      const userId = req.user.id
      const payload = {
        perPage: req.query.perPage || 5,
        currentPage: req.query.currentPage || 1,
      }

      const addresses = await usecase.getAddresses(userId, payload)
      if (addresses.data.length < 1) {
        return responseError(next, 404, "address tidak ditemukan")
      }

      return res.status(200).send({
        message: "Success mendapatkan data address",
        ...addresses,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.getAddressById = async (req, res, next) => {
    try {
      const { id } = req.params
      const userId = req.user.id
      const address = await usecase.getAddressesByAttribute("id", id)

      if (!address) {
        return responseError(next, 404, "address tidak ditemukan")
      }

      if (address.user_id !== userId) {
        return responseError(next, 401, "Akses ditolak, unauthorized!")
      }

      delete address.user_id
      res.status(200).send({
        message: "Success mendapatkan data address",
        data: address,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.createAddress = async (req, res, next) => {
    try {
      const data = req.body
      const userId = req.user.id

      const checkUser = await usecase.getCollectionByAttr("users", userId)

      if (!checkUser) {
        return responseError(next, 400, "User tidak ditemukan")
      }

      const payload = {
        address: data.address,
        user_id: userId,
      }

      const address = await usecase.createAddress(payload)
      if (!address) {
        return responseError(next, 500, "Gagal tambah data address")
      }

      res.status(201).send({
        message: "Success tambah data address",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.updateAddress = async (req, res, next) => {
    try {
      const data = req.body
      const { id } = req.params
      const userId = req.user.id

      const address = await usecase.getAddressesByAttribute("id", id)
      if (!address) {
        return responseError(next, 404, "address tidak ditemukan")
      }

      if (address.user_id !== userId) {
        return responseError(next, 401, "Akses ditolak, unauthorized!")
      }

      const payload = {
        address: data.address,
        user_id: data.user_id,
      }

      const addressUpdated = await usecase.updateAddress(id, payload)
      if (addressUpdated == 0) {
        return responseError(next, 500, "Gagal update data address")
      }

      res.status(200).send({
        message: "Success update data address",
        data: payload,
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.deleteAddressById = async (req, res, next) => {
    try {
      const { id } = req.params
      const userId = req.user.id

      const address = await usecase.getAddressesByAttribute("id", id)
      if (!address) {
        return responseError(next, 404, "address tidak ditemukan")
      }

      if (address.user_id !== userId) {
        return responseError(next, 401, "Akses ditolak, unauthorized!")
      }

      const addressDeleted = await usecase.deleteAddressById(id)
      if (addressDeleted == 0) {
        return responseError(next, 500, "Gagal delete data address")
      }

      res.status(200).send({
        message: "Success delete data address",
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  module.deleteAllAddress = async (req, res, next) => {
    try {
      const userId = req.user.id

      const addressById = await usecase.getCollectionByAttr(
        "customers_addresses",
        userId,
        "customer_id"
      )

      if (!addressById) {
        return responseError(next, 400, "address tidak ditemukan")
      }

      const address = await usecase.deletedAdressByAttr("customer_id", userId)
      if (address == 0) {
        return responseError(next, 500, "Gagal delete data address")
      }

      res.status(200).send({
        message: "Success delete semua data address",
      })
    } catch (error) {
      return responseError(next, 500, "Server error")
    }
  }

  return module
}
