const knexnest = require("knexnest")

module.exports = (knex) => {
  module.getCarts = (userId) => {
    const sql = knex("carts as c")
      .select(
        "c.id as _id",
        "c.qty as _qty",
        "u.id as _user_id",
        "u.name as _user_name",
        "u.email as _user_email",
        "p.id as _product_id",
        "p.name as _product_name",
        "p.description as _product_description",
        "p.stock as _product_stock",
        "p.image as _product_image",
        "p.price as _product_price"
      )
      .where("user_id", userId)
      .innerJoin("products as p", "p.id", "=", "c.product_id")
      .innerJoin("users as u", "u.id", "=", "c.user_id")

    return knexnest(sql)
  }

  module.getCollectionByAttr = (col, id, attr = "id") => {
    if (col === "carts" && attr === "id") {
      const sql = knex("carts as c")
        .select(
          "c.id as id",
          "c.qty as qty",
          "u.id as user_id",
          "u.name as user_name",
          "u.email as user_email",
          "p.id as product_id",
          "p.name as product_name",
          "p.description as product_description",
          "p.stock as product_stock",
          "p.image as product_image",
          "p.price as product_price"
        )
        .where("c.id", id)
        .innerJoin("products as p", "p.id", "=", "c.product_id")
        .innerJoin("users as u", "u.id", "=", "c.user_id")

      return knexnest(sql)
    } else {
      return knex(col).where(attr, id).first()
    }
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

  module.checkCartExist = (productId, userId) => {
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

  return module
}
