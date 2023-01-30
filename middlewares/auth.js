require("dotenv/config")

const knex = require("../knexmain")
const { verifyToken } = require("../utils/authentication")

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).send({
        message: "Akses ditolak, unauthorized!",
      })
    }

    const verify = await verifyToken(token)
    if (!verify) {
      return res.status(401).send({
        message: "Token tidak valid",
      })
    }

    if (verify.exp * 1000 <= Date.now()) {
      return res.status(401).send({
        message: "Token expired",
      })
    }

    const user = await knex("users")
      .where("id", verify.id)
      .where("email", verify.email)
      .first()
    if (!user) {
      return res.status(401).send({
        message: "Token tidak valid",
      })
    }

    req.user = user
    next()
  } catch (err) {
    res.status(400).send({
      message: "Token expired",
    })
  }
}
