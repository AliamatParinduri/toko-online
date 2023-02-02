const knexnest = require("knexnest")

const tableHeader = "orders"
const tableDetail = "orders_detail"

module.exports = (knex) => {
  module.getAllOrdersByCustomer = (customerId, { perPage, currentPage }) => {
    const knexSql = knex
      .select(
        "orders.id as id",
        "orders.total as total",
        "orders.status as status",
        "addresses.id as address_id",
        "addresses.address as address_address",
        "coupons.id as coupon_id",
        "coupons.description as coupon_description",
        "coupons.percentage as coupon_percentage",
        "coupons.fixedDiscount as coupon_fixedDiscount"
      )
      .where("orders.customer_id", customerId)
      .table(tableHeader)
      .innerJoin(tableDetail, "orders_detail.order_id", "=", "orders.id")
      .innerJoin("addresses", "addresses.id", "=", "orders.address_id")
      .innerJoin("coupons", "coupons.id", "=", "orders.coupon_id")
      .paginate({ perPage, currentPage })
    return knexnest(knexSql)
  }

  module.getCouponByAttribute = (attr, payload) => {
    return knex("coupons").where(attr, payload).first()
  }

  module.getCouponUsedByAttribute = (attr, payload) => {
    return knex(tableHeader).where(attr, payload).first()
  }

  module.checkDataCart = async (cart) => {
    const carts = await knex("carts")
      .whereIn("id", cart)
      .count("id as jml")
      .first()
    return carts.jml
  }

  module.checkTotalPrice = async (total, cart) => {
    const totalPrice = await knex("carts")
      .sum("products.price as total_price")
      .innerJoin("products", "products.id", "=", "carts.product_id")
      .whereIn("carts.id", cart)
      .first()
    return totalPrice.total_price == total
  }

  module.checkout = (payload) => {
    return knex.transaction(function (trx) {
      carts = payload.cart

      return trx
        .insert({
          total: payload.total,
          address_id: payload.address_id,
          customer_id: payload.customer_id,
          coupon_id: payload.coupon_id,
        })
        .into(tableHeader)
        .then((ids) => {
          const newCart = carts.map((cart) => {
            return {
              order_id: ids[0],
              cart_id: cart,
            }
          })
          return trx(tableDetail).insert(newCart)
        })
    })
  }

  return module
}
