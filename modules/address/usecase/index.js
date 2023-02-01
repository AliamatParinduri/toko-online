module.exports = (repository) => {
  module.getAddresses = (userId, payload) => {
    return repository.getAddresses(userId, payload)
  }

  module.getCollectionByAttr = (col, id, attr) => {
    return repository.getCollectionByAttr(col, id, attr)
  }

  module.getAddressesByAttribute = (attr, payload) => {
    return repository.getAddressesByAttribute(attr, payload)
  }

  module.checkAddressExist = (productId, userId) => {
    return repository.checkAddressExist(productId, userId)
  }

  module.createAddress = (payload) => {
    return repository.createAddress(payload)
  }

  module.updateAddress = (id, payload) => {
    return repository.updateAddress(id, payload)
  }

  module.deleteAddressById = (id) => {
    return repository.deleteAddressById(id)
  }

  module.deletedAdressByAttr = (attr, id) => {
    return repository.deletedAdressByAttr(attr, id)
  }

  return module
}
