module.exports = (repository) => {
  module.getCategories = () => {
    return repository.getCategories()
  }

  module.getCategoryById = (id) => {
    return repository.getCategoryById(id)
  }

  module.getCategoryByAttribute = (attr, payload) => {
    return repository.getCategoryByAttribute(attr, payload)
  }

  module.getCategoryByAttrWhereNot = (attr1, payload1, attr2, payload2) => {
    return repository.getCategoryByAttrWhereNot(
      attr1,
      payload1,
      attr2,
      payload2
    )
  }

  module.createCategory = (payload) => {
    return repository.createCategory(payload)
  }

  module.updateCategory = (id, payload) => {
    return repository.updateCategory(id, payload)
  }

  module.deleteCategory = (id) => {
    return repository.deleteCategory(id)
  }

  return module
}
