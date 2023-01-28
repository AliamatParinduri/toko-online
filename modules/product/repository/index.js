module.exports = (knex) => {
  module.getProducts = () => {
    return knex("products")
  }

  module.getProductById = (id) => {
    return knex("products").where("id", id).first()
  }

  module.getProductByAttribute = (attr, payload) => {
    return knex("products").where(attr, payload).first()
  }

  module.getProductByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex("products")
      .where(attr1, payload1)
      .whereNot(attr2, payload2)
      .first()
  }

  module.createProduct = (payload) => {
    return knex("products").insert(payload)
  }

  module.updateProduct = (id, payload) => {
    return knex("products").where("id", id).update(payload)
  }

  module.deleteProduct = (id) => {
    return knex("products").where("id", id).del()
  }

  return module
}
