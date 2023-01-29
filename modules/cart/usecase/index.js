module.exports = (repository) => {
  module.getCarts = () => {
    return repository.getCarts()
  }

  module.getCollectionById = (col, id) => {
    return repository.getCollectionById(col, id)
  }

  module.getCartByAttribute = (attr, payload) => {
    return repository.getCartByAttribute(attr, payload)
  }

  module.getCartByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return repository.getCartByAttrWhereNot(attr1, payload1, attr2, payload2)
  }

  module.createCart = (payload) => {
    return repository.createCart(payload)
  }

  module.updateCart = (id, payload) => {
    return repository.updateCart(id, payload)
  }

  module.deleteCart = (id) => {
    return repository.deleteCart(id)
  }

  return module
}
