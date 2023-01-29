module.exports = (knex) => {
  module.getCarts = () => {
    return knex("carts")
  }

  module.getCollectionById = (col, id) => {
    return knex(col).where("id", id).first()
  }

  module.getCartByAttribute = (attr, payload) => {
    return knex("carts").where(attr, payload).first()
  }

  module.getCartByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex("carts")
      .where(attr1, payload1)
      .whereNot(attr2, payload2)
      .first()
  }

  module.createCart = (payload) => {
    return knex("carts").insert(payload)
  }

  module.updateCart = (id, payload) => {
    return knex("carts").where("id", id).update(payload)
  }

  module.deleteCart = (id) => {
    return knex("carts").where("id", id).del()
  }

  return module
}
