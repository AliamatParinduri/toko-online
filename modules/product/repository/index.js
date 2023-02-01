const table = "products"

module.exports = (knex) => {
  module.getProducts = ({ perPage, currentPage }) => {
    return knex(table).paginate({ perPage, currentPage })
  }

  module.getProductById = (id) => {
    return knex(table).where("id", id).first()
  }

  module.getProductByAttribute = (attr, payload) => {
    return knex(table).where(attr, payload).first()
  }

  module.getProductByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex(table).where(attr1, payload1).whereNot(attr2, payload2).first()
  }

  module.createProduct = (payload) => {
    return knex(table).insert(payload)
  }

  module.updateProduct = (id, payload) => {
    return knex(table).where("id", id).update(payload)
  }

  module.deleteProduct = (id) => {
    return knex(table).where("id", id).del()
  }

  return module
}
