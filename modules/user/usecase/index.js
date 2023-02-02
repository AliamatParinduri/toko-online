module.exports = (repository) => {
  module.getUsers = (type, payload) => {
    return repository.getUsers(type, payload)
  }

  module.getUserById = (type, id) => {
    return repository.getUserById(type, id)
  }

  module.getUserByAttribute = (attr, payload) => {
    return repository.getUserByAttribute(attr, payload)
  }

  module.getUserByAttrWhereNot = (attr1, payload1, attr2, payload2, type) => {
    return repository.getUserByAttrWhereNot(
      attr1,
      payload1,
      attr2,
      payload2,
      type
    )
  }

  module.createUser = (payload) => {
    return repository.createUser(payload)
  }

  module.updateUser = (id, payload) => {
    return repository.updateUser(id, payload)
  }

  module.deleteUser = (id, userId, type) => {
    return repository.deleteUser(id, userId, type)
  }

  return module
}
