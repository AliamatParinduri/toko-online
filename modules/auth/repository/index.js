const table = "users"

module.exports = (knex) => {
  module.getUserByAttribute = (attr, payload) => {
    return knex(table).where(attr, payload).first()
  }

  module.createUser = (payload) => {
    return knex(table).insert(payload)
  }

  return module
}
