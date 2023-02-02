const knexnest = require("knexnest")

const table = "carts"

module.exports = (knex) => {
  module.getCarts = (userId, { perPage, currentPage }) => {
    return knex("carts as c")
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
      .then((result) => {
        const data = result.data.map((data) => {
          return {
            id: data.id,
            qty: data.qty,
            user: {
              id: data.user_id,
              name: data.user_name,
              email: data.user_email,
            },
            product: {
              id: data.product_id,
              name: data.product_name,
              description: data.product_description,
              price: data.product_price,
              stock: data.product_stock,
              image: data.product_image,
            },
          }
        })

        return {
          data,
          pagination: {
            total: result.pagination.total,
            lastPage: result.pagination.lastPage,
            perPage: result.pagination.perPage,
            currentPage: result.pagination.currentPage,
            from: result.pagination.from,
            to: result.pagination.to,
          },
        }
      })
  }

  module.getCollectionByAttr = (col, id, attr = "id") => {
    if (col === "carts" && attr === "id") {
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
        .where("c.id", id)
        .innerJoin("products as p", "p.id", "=", "c.product_id")
        .innerJoin("users as u", "u.id", "=", "c.customer_id")
        .innerJoin("customers as cus", "u.id", "=", "cus.user_id")
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
      .where("customer_id", userId)
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
