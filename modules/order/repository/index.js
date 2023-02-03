const table = "orders"
const tableDetail = "orders_detail"

module.exports = (knex) => {
  module.getAllOrdersByCustomer = (customerId, { perPage, currentPage }) => {
    // knex(table).then((data) => {
    //   knex(tableDetail)
    //     .where("order_id", data[2].id)
    // })
    return knex
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
      .table(table)
      .innerJoin(tableDetail, "orders_detail.order_id", "=", "orders.id")
      .innerJoin("addresses", "addresses.id", "=", "orders.address_id")
      .innerJoin("coupons", "coupons.id", "=", "orders.coupon_id")
      .paginate({ perPage, currentPage })
      .then((result) => {
        const data = result.data.map((data) => {
          return {
            id: data.id,
            total: data.total,
            status: data.total,
            address: {
              id: data.address_id,
              address: data.address_address,
            },
            coupon: {
              id: data.coupon_id,
              description: data.coupon_description,
              percentage: data.coupon_percentage,
              fixedDiscount: data.coupon_fixedDiscount,
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

  module.getCouponByAttribute = (attr, payload) => {
    return knex("coupons").where(attr, payload).first()
  }

  module.getCouponUsedByAttribute = (attr, payload) => {
    return knex(table).where(attr, payload).first()
  }

  module.checkDataCart = async (cart) => {
    const carts = await knex("carts")
      .whereIn("id", cart)
      .count("id as jml")
      .first()
    return carts.jml
  }

  module.checkTotalPrice = async (payload) => {
    let totalDiskon = 0
    const totalPrice = await knex("carts")
      .innerJoin("products", "products.id", "=", "carts.product_id")
      .whereIn("carts.id", payload.cart)
      .then((datas) => {
        let total = 0
        datas.map((data) => {
          total += data.qty * data.price
        })
        return total
      })

    if (payload.coupon_id) {
      coupon = await knex("coupons").where("id", payload.coupon_id).first()
      totalDiskon =
        coupon.percentage > 0
          ? (totalPrice * coupon.percentage) / 100
          : coupon.fixedDiscount
    }
    return totalPrice - totalDiskon == payload.total
  }

  module.checkStockProduct = async (cart) => {
    const data = await knex("carts").whereIn("id", cart)
    for (const dt of data) {
      const product = await knex("products")
        .select("stock")
        .where("id", dt.product_id)
        .first()
      if (product.stock < dt.qty) {
        return []
      }
    }
    return data
  }

  module.updateStockProduct = async (payload) => {
    for (const data of payload) {
      const product = await knex("products")
        .where("id", data.product_id)
        .first()

      await knex("products")
        .where("id", data.product_id)
        .update({ stock: product.stock - data.qty })
    }
  }

  module.deleteCart = async (cart) => {
    return cart.map(async (data) => {
      return knex("carts").where("id", data).del()
    })
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
        .into(table)
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
