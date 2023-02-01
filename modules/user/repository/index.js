const table = "users"

module.exports = (knex) => {
  module.getUsers = ({ perpage, currentPage }) => {
    return knex(table).paginate({ perpage, currentPage })
  }

  module.getUserById = (id) => {
    return knex(table).where("id", id).first()
  }

  module.getUserByAttribute = (attr, payload) => {
    return knex(table).where(attr, payload).first()
  }

  module.getUserByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex(table).where(attr1, payload1).whereNot(attr2, payload2).first()
  }

  module.createUser = (payload) => {
    return knex(table).insert(payload)
  }

  module.updateUser = (id, payload) => {
    return knex(table).where("id", id).update(payload)
  }

  module.deleteUser = (id) => {
    return knex(table).where("id", id).del()
  }

  return module
}
