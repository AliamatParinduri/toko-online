module.exports = (repository) => {
  module.getAllOrdersByCustomer = (customerId, payload) => {
    return repository.getAllOrdersByCustomer(customerId, payload)
  }
  module.checkout = (payload) => {
    return repository.checkout(payload)
  }

  return module
}
