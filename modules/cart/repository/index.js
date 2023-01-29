module.exports = (knex) => {
  module.getCarts = (userId) => {
    return knex("carts").where("user_id", userId)
  }

  module.getCollectionByAttr = (col, id, attr = "id") => {
    return knex(col).where(attr, id).first()
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

  module.checkExistCart = (productId, userId) => {
    return knex("carts")
      .where("product_id", productId)
      .where("user_id", userId)
      .first()
  }

  module.createCart = (payload) => {
    return knex("carts").insert(payload)
  }

  module.updateCart = (id, payload) => {
    return knex("carts").where("id", id).update(payload)
  }

  module.deleteCartById = (id) => {
    return knex("carts").where("id", id).del()
  }

  module.deleteCartByAttr = (attr, id) => {
    return knex("carts").where(attr, id).del()
  }

  module.deleteAllCart = (user_id) => {
    return knex("carts").where("user_id", user_id).del()
  }

  return module
}
