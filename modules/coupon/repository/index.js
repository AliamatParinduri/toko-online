module.exports = (knex) => {
  module.getCoupons = () => {
    return knex("coupons")
  }

  module.getCouponById = (id) => {
    return knex("coupons").where("id", id).first()
  }

  module.getCouponByAttribute = (attr, payload) => {
    return knex("coupons").where(attr, payload).first()
  }

  module.getCouponByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex("coupons")
      .where(attr1, payload1)
      .whereNot(attr2, payload2)
      .first()
  }

  module.createCoupon = (payload) => {
    return knex("coupons").insert(payload)
  }

  module.updateCoupon = (id, payload) => {
    return knex("coupons").where("id", id).update(payload)
  }

  module.deleteCoupon = (id) => {
    return knex("coupons").where("id", id).del()
  }

  return module
}
