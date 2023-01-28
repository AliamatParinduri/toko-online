module.exports = (knex) => {
  module.getUsers = () => {
    return knex("users")
  }

  module.getUserById = (id) => {
    return knex("users").where("id", id).first()
  }

  module.getUserByAttribute = (attr, payload) => {
    return knex("users").where(attr, payload).first()
  }

  module.getUserByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex("users")
      .where(attr1, payload1)
      .whereNot(attr2, payload2)
      .first()
  }

  module.createUser = (payload) => {
    return knex("users").insert(payload)
  }

  module.updateUser = (id, payload) => {
    return knex("users").where("id", id).update(payload)
  }

  module.deleteUser = (id) => {
    return knex("users").where("id", id).del()
  }

  return module
}
