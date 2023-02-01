const knexnest = require("knexnest")

const tableHeader = "orders"
const tableDetail = "orders_detail"

module.exports = (knex) => {
  module.getAllOrdersByUsersId = (userId, { perPage, currentPage }) => {
    const knexSql = knex
      .select(
        "orders.id as id",
        "orders.total as total",
        "addresses.id as address_id",
        "addresses.address as address_address",
        "coupons.id as coupon_id",
        "coupons.description as coupon_description",
        "coupons.percentage as coupon_percentage",
        "coupons.fixedDiscount as coupon_fixedDiscount"
      )
      .where("orders.customer_id", userId)
      .table(tableHeader)
      .innerJoin("addresses", "addresses.id", "=", "orders.address_id")
      .innerJoin("coupons", "coupons.id", "=", "orders.coupon_id")
      .paginate({ perPage, currentPage })
    return knexnest(knexSql)
  }

  module.checkout = (payload) => {
    return knex.transaction(function (trx) {
      carts = payload.cart

      return trx
        .insert({
          total: payload.total,
          address_id: payload.address_id,
          user_id: payload.user_id,
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
