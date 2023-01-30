const table = "coupons"

module.exports = (knex) => {
  module.getCoupons = () => {
    return knex(table)
  }

  module.getCouponById = (id) => {
    return knex(table).where("id", id).first()
  }

  module.getCouponByAttribute = (attr, payload) => {
    return knex(table).where(attr, payload).first()
  }

  module.getCouponByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return knex(table).where(attr1, payload1).whereNot(attr2, payload2).first()
  }

  module.createCoupon = (payload) => {
    return knex(table).insert(payload)
  }

  module.updateCoupon = (id, payload) => {
    return knex(table).where("id", id).update(payload)
  }

  module.deleteCoupon = (id) => {
    return knex(table).where("id", id).del()
  }

  return module
}
