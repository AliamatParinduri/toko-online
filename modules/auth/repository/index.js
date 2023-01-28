module.exports = (knex) => {
  module.getUserByAttribute = (attr, payload) => {
    return knex("users").where(attr, payload).first()
  }

  module.createUser = (payload) => {
    return knex("users").insert(payload)
  }

  return module
}
