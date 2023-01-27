require('dotenv/config')

const knex = require('../../knex')
const { verifyToken } = require('../utils/authentication')

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).send({
        message: "Unauthorization!",
      })
    }

    const verify = await verifyToken(token)
    if (!verify) {
      return res.status(401).send({
        message: "token tidak valid",
      })
    }

    // periksa expired
    if (verify.exp * 1000 <= Date.now()) {
      return res.status(401).send({
        message: "token expired",
      })
    }

    const user = await knex("users")
      .where("id", verify.id)
      .where("email", verify.email)
      .first()
    if (!user) {
      return res.status(401).send({
        message: "token tidak valid",
      })
    }

    req.user = user
    next()
  } catch (err) {
    res.status(500).send({
      message: "Server Error",
    })
  }
}
