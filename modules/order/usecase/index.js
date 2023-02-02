module.exports = (repository) => {
  module.getAllOrdersByCustomer = (customerId, payload) => {
    return repository.getAllOrdersByCustomer(customerId, payload)
  }

  module.getCouponByAttribute = (attr, payload) => {
    return repository.getCouponByAttribute(attr, payload)
  }

  module.getCouponUsedByAttribute = (attr, payload) => {
    return repository.getCouponUsedByAttribute(attr, payload)
  }

  module.checkDataCart = (cart) => {
    return repository.checkDataCart(cart)
  }

  module.checkTotalPrice = (total, cart) => {
    return repository.checkTotalPrice(total, cart)
  }

  module.checkout = (payload) => {
    return repository.checkout(payload)
  }

  return module
}
