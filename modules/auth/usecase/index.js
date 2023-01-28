module.exports = (repository) => {
  module.getUserByAttribute = (attr, payload) => {
    return repository.getUserByAttribute(attr, payload)
  }

  module.createUser = (payload) => {
    return repository.createUser(payload)
  }

  return module
}
