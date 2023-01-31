const table = "categories"

module.exports = (knex) => {
  module.getCategories = ({ perPage, currentPage }) => {
    return knex(table).paginate({ perPage, currentPage })
  }

  module.getCategoryById = (id) => {
    return knex(table).where("id", id).first()
  }

  module.getCategoryByAttribute = (attr, payload) => {
    return knex(table).where(attr, payload).first()
  }

  module.getCategoryByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex(table).where(attr1, payload1).whereNot(attr2, payload2).first()
  }

  module.createCategory = (payload) => {
    return knex(table).insert(payload)
  }

  module.updateCategory = (id, payload) => {
    return knex(table).where("id", id).update(payload)
  }

  module.deleteCategory = (id) => {
    return knex(table).where("id", id).del()
  }

  return module
}
