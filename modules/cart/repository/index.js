const knexnest = require("knexnest")

const table = "carts"

module.exports = (knex) => {
  module.getCarts = (userId, { perPage, currentPage }) => {
    const sql = knex("carts as c")
      .select(
        "c.id as id",
        "c.qty as qty",
        "u.id as user_id",
        "cus.name as user_name",
        "u.email as user_email",
        "p.id as product_id",
        "p.name as product_name",
        "p.description as product_description",
        "p.stock as product_stock",
        "p.image as product_image",
        "p.price as product_price"
      )
      .where("user_id", userId)
      .innerJoin("products as p", "p.id", "=", "c.product_id")
      .innerJoin("users as u", "u.id", "=", "c.customer_id")
      .innerJoin("customers as cus", "u.id", "=", "cus.user_id")
      .paginate({ perPage, currentPage })
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
    return knex(table).where(attr, payload).first()
  }

  module.getCartByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex(table).where(attr1, payload1).whereNot(attr2, payload2).first()
  }

  module.checkCartExist = (productId, userId) => {
    return knex(table)
      .where("product_id", productId)
      .where("user_id", userId)
      .first()
  }

  module.createCart = (payload) => {
    return knex(table).insert(payload)
  }

  module.updateCart = (id, payload) => {
    return knex(table).where("id", id).update(payload)
  }

  module.deleteCartById = (id) => {
    return knex(table).where("id", id).del()
  }

  module.deleteCartByAttr = (attr, id) => {
    return knex(table).where(attr, id).del()
  }

  return module
}
