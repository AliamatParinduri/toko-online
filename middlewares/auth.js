require("dotenv/config")

const knex = require("../knexmain")
const { responseError } = require("../helper/responseMessages")
const { verifyToken } = require("../utils/authentication")

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return responseError(next, 401, "Akses ditolak, unauthorized!")
    }

    const verify = await verifyToken(token)
    if (!verify) {
      return responseError(next, 401, "Token tidak valid")
    }

    if (verify.exp * 1000 <= Date.now()) {
      return responseError(next, 401, "Token expired")
    }

    const user = await knex("users")
      .where("id", verify.id)
      .where("email", verify.email)
      .first()
    if (!user) {
      return responseError(next, 401, "Token tidak valid")
    }

    req.user = user
    next()
  } catch (err) {
    return responseError(next, 401, "Token expired")
  }
}
