module.exports = (repository) => {
  module.getCarts = (userId) => {
    return repository.getCarts(userId)
  }

  module.getCollectionByAttr = (col, id, attr) => {
    return repository.getCollectionByAttr(col, id, attr)
  }

  module.getCartByAttribute = (attr, payload) => {
    return repository.getCartByAttribute(attr, payload)
  }

  module.getCartByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return repository.getCartByAttrWhereNot(attr1, payload1, attr2, payload2)
  }

  module.checkCartExist = (productId, userId) => {
    return repository.checkCartExist(productId, userId)
  }

  module.createCart = (payload) => {
    return repository.createCart(payload)
  }

  module.updateCart = (id, payload) => {
    return repository.updateCart(id, payload)
  }

  module.deleteCartById = (id) => {
    return repository.deleteCartById(id)
  }

  module.deleteCartByAttr = (attr, id) => {
    return repository.deleteCartByAttr(attr, id)
  }

  return module
}
