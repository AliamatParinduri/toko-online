module.exports = (repository) => {
  module.getAllOrdersByUsersId = (userId) => {
    return repository.getAllOrdersByUsersId(userId)
  }
  module.checkout = (payload) => {
    return repository.checkout(payload)
  }

  return module
}
