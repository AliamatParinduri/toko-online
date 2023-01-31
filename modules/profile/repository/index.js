const { passwordHash } = require("../../../utils/authentication")

const table = "users"

module.exports = (knex) => {
  module.getProfile = (payload) => {
    const sql = knex(table)
      .select("users.id as id", "email", "name", "phone", "profilePicture")
      .where("user_id", payload.id)
      .innerJoin("customers", "customers.user_id", "=", "users.id")
      .first()

    return sql
  }

  module.updateCustomerProfile = (id, payload) => {
    return knex("customers").where("id", id).update(payload)
  }

  module.updatePassword = async (id, newPassword) => {
    return knex(table)
      .where("id", id)
      .update({
        password: await passwordHash(newPassword),
      })
  }

  return module
}
