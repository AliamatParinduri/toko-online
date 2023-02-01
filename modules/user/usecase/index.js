module.exports = (repository) => {
  module.getUsers = (payload) => {
    return repository.getUsers(payload)
  }

  module.getUserById = (id) => {
    return repository.getUserById(id)
  }

  module.getUserByAttribute = (attr, payload) => {
    return repository.getUserByAttribute(attr, payload)
  }

  module.getUserByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return repository.getUserByAttrWhereNot(attr1, payload1, attr2, payload2)
  }

  module.createUser = (payload) => {
    return repository.createUser(payload)
  }

  module.updateUser = (id, payload) => {
    return repository.updateUser(id, payload)
  }

  module.deleteUser = (id) => {
    return repository.deleteUser(id)
  }

  return module
}
