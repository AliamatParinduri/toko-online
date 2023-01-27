require('dotenv/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.passwordHash = async password => {
  const salt = await bcrypt.genSalt(+process.env.SALT || 12)
  return await bcrypt.hash(password, salt)
}

exports.passwordCompare = async (password, userPW) => {
  return await bcrypt.compare(password, userPW)
}

exports.generateToken = payload => {
  return jwt.sign(payload, process.env.SECRET || "SECRET", {expiresIn: '1h'})
}