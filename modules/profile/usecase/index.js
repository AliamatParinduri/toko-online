module.exports = (repository) => {
  module.getProfile = (payload) => {
    return repository.getProfile(payload)
  }
  module.updateCustomerProfile = (id, payload) => {
    return repository.updateCustomerProfile(id, payload)
  }

  module.updatePassword = (id, newPassword) => {
    return repository.updatePassword(id, newPassword)
  }

  return module
}
