const knexnest = require("knexnest")

module.exports = (knex) => {
  module.getAddresses = (userId) => {
    const sql = knex("Addresses as a")
      .select(
        "a.id as _id",
        "a.address as _address",
        "u.id as _user_id",
        "u.name as _user_name",
        "u.email as _user_email"
      )
      .where("user_id", userId)
      .innerJoin("users as u", "u.id", "=", "a.user_id")

    return knexnest(sql)
  }

  module.getCollectionByAttr = (col, id, attr = "id") => {
    return knex(col).where(attr, id).first()
  }

  module.getAddressesByAttribute = (attr, payload) => {
    const sql = knex("Addresses as a")
      .select(
        "a.id as id",
        "a.address as address",
        "u.id as user_id",
        "u.name as user_name",
        "u.email as user_email"
      )
      .where("a." + attr, payload)
      .innerJoin("users as u", "u.id", "=", "a.user_id")

    return knexnest(sql)
  }

  module.checkAddresseExist = (productId, userId) => {
    return knex("Addresses")
      .where("product_id", productId)
      .where("user_id", userId)
      .first()
  }

  module.createAddress = (payload) => {
    return knex("Addresses").insert(payload)
  }

  module.updateAddress = (id, payload) => {
    return knex("Addresses").where("id", id).update(payload)
  }

  module.deleteAddressById = (id) => {
    return knex("Addresses").where("id", id).del()
  }

  module.deletedAdressByAttr = (attr, id) => {
    return knex("Addresses").where(attr, id).del()
  }

  return module
}
