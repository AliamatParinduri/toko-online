const knexnest = require("knexnest")

const tableHeader = "orders_header"
const tableDetail = "orders_detail"

module.exports = (knex) => {
   module.getAllOrdersByUsersId = (userId) => {
     const knexSql = knex
       .select(
         "orders_header.id as _id",
         "orders_header.total as _total",
         "addresses.id as _address_id",
         "addresses.address as _address_address",
         "coupons.id as _coupon_id",
         "coupons.description as _coupon_description",
         "coupons.percentage as _coupon_percentage",
         "coupons.fixedDiscount as _coupon_fixedDiscount"
       )
       .where("orders_header.user_id", userId)
       .table(tableHeader)
       // .innerJoin(tableDetail, 'orders_detail.order_id','=', 'orders_header.id')
       .innerJoin("addresses", "addresses.id", "=", "orders_header.address_id")
       .innerJoin("coupons", "coupons.id", "=", "orders_header.coupon_id")
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
