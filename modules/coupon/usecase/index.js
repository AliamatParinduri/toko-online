module.exports = (repository) => {
  module.getCoupons = (userId, payload) => {
    return repository.getCoupons(userId, payload)
  }

  module.getCouponById = (id) => {
    return repository.getCouponById(id)
  }

  module.getCouponByAttribute = (attr, payload) => {
    return repository.getCouponByAttribute(attr, payload)
  }

  module.getCouponByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return repository.getCouponByAttrWhereNot(attr1, payload1, attr2, payload2)
  }

  module.createCoupon = (payload) => {
    return repository.createCoupon(payload)
  }

  module.updateCoupon = (id, payload) => {
    return repository.updateCoupon(id, payload)
  }

  module.deleteCoupon = (id) => {
    return repository.deleteCoupon(id)
  }

  return module
}
