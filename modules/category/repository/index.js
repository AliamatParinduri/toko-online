module.exports = (knex) => {
  module.getCategories = () => {
    return knex("categories")
  }

  module.getCategoryById = (id) => {
    return knex("categories").where("id", id).first()
  }

  module.getCategoryByAttribute = (attr, payload) => {
    return knex("categories").where(attr, payload).first()
  }

  module.getCategoryByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex("categories")
      .where(attr1, payload1)
      .whereNot(attr2, payload2)
      .first()
  }

  module.createCategory = (payload) => {
    return knex("categories").insert(payload)
  }

  module.updateCategory = (id, payload) => {
    return knex("categories").where("id", id).update(payload)
  }

  module.deleteCategory = (id) => {
    return knex("categories").where("id", id).del()
  }

  return module
}
