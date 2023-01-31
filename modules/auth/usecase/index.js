module.exports = (repository) => {
  module.getUserByAttribute = (attr, payload, type) => {
    return repository.getUserByAttribute(attr, payload, type)
  }

  module.createUser = (payload) => {
    return repository.createUser(payload)
  }

  return module
}
