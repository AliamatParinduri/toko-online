module.exports = (repository) => {
  module.getAllOrdersByUsersId = (userId, payload) => {
    return repository.getAllOrdersByUsersId(userId, payload)
  }
  module.checkout = (payload) => {
    return repository.checkout(payload)
  }

  return module
}
