const knex = require("../../knex")
const { responseError } = require("../helper/responseMessages")

exports.getCoupons = async (req, res, next) => {
  try {
    const coupons = await knex("coupons")

    if (coupons.length < 1) {
      return responseError(next, 404, "data coupon tidak ditemukan")
    }

    res.status(200).send({
      message: "success mendapatkan data coupon",
      data: coupons,
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.getCouponById = async (req, res, next) => {
  try {
    const { id } = req.params

    const coupon = await knex("coupons").where("id", id).first()

    if (!coupon) {
      return responseError(next, 404, "data coupon tidak ditemukan")
    }

    res.status(200).send({
      message: "success mendapatkan data coupon",
      data: coupon,
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.createCoupon = async (req, res, next) => {
  try {
    const data = req.body

    const checkCoupon = await knex("coupons").where("code", data.code).first()

    if (checkCoupon) {
      return responseError(next, 404, "coupon sudah digunakan")
    }

    await knex("coupons").insert({
      code: data.code,
      description: data.description,
    })

    res.status(201).send({
      message: "Success tambah data coupon",
      data: {
        code: data.code,
        description: data.description,
      },
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.updateCoupon = async (req, res, next) => {
  try {
    const data = req.body
    const { id } = req.params

    const checkCoupon = await knex("coupons")
      .where("code", data.code)
      .whereNot("id", id)
      .first()

    if (checkCoupon) {
      return responseError(next, 404, "coupon sudah digunakan")
    }

    await knex("coupons").where("id", id).update({
      code: data.code,
      description: data.description,
    })

    res.status(200).send({
      message: "Success update data coupon",
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}

exports.deleteCoupon = async (req, res, next) => {
  try {
    const { id } = req.params

    const coupon = await knex("coupons").where("id", id).del()

    if (coupon == 0) {
      return responseError(next, 400, "coupon tidak ditemukan")
    }

    res.status(200).send({
      message: "Success delete data coupon",
    })
  } catch (error) {
    return responseError(next, 500, "server error")
  }
}
