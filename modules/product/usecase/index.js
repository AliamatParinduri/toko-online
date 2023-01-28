module.exports = (repository) => {
  module.getProducts = () => {
    return repository.getProducts()
  }

  module.getProductById = (id) => {
    return repository.getProductById(id)
  }

  module.getProductByAttribute = (attr, payload) => {
    return repository.getProductByAttribute(attr, payload)
  }

  module.getProductByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return repository.getProductByAttrWhereNot(attr1, payload1, attr2, payload2)
  }

  module.createProduct = (payload) => {
    return repository.createProduct(payload)
  }

  module.updateProduct = (id, payload) => {
    return repository.updateProduct(id, payload)
  }

  module.deleteProduct = (id) => {
    return repository.deleteProduct(id)
  }

  return module
}
