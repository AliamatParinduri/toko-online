const knexnest = require("knexnest")

const table = "addresses"

module.exports = (knex) => {
  module.getAddresses = (userId, { perPage, currentPage }) => {
    return knex("users")
      .select(
        `${table}.id`,
        "customers.name",
        `${table}.address`,
        `users.email`,
        "customers.phone"
      )
      .where("users.id", userId)
      .innerJoin("customers", "customers.user_id", "=", "users.id")
      .innerJoin(
        "customers_Addresses",
        "customers_Addresses.customer_id",
        "=",
        "customers.id"
      )
      .innerJoin(
        "addresses",
        "customers_addresses.address_id",
        "=",
        "addresses.id"
      )
      .paginate({ perPage, currentPage })
  }

  module.getCollectionByAttr = (col, id, attr = "id") => {
    return knex(col).where(attr, id).first()
  }

  module.getAddressesByAttribute = (attr, payload) => {
    return knex("users")
      .select(
        `${table}.id`,
        "customers.name",
        `${table}.address`,
        `users.email`,
        "customers.phone",
        "customers.user_id"
      )
      .where("addresses." + attr, payload)
      .innerJoin("customers", "customers.user_id", "=", "users.id")
      .innerJoin(
        "customers_Addresses",
        "customers_Addresses.customer_id",
        "=",
        "customers.id"
      )
      .innerJoin(
        "addresses",
        "customers_addresses.address_id",
        "=",
        "addresses.id"
      )
      .first()
  }

  module.checkAddresseExist = (productId, userId) => {
    return knex(table)
      .where("product_id", productId)
      .where("user_id", userId)
      .first()
  }

  module.createAddress = async (payload) => {
    const addresses = await knex(table).insert({
      address: payload.address,
    })
    return knex("customers_addresses").insert({
      customer_id: payload.user_id,
      address_id: addresses,
    })
  }

  module.updateAddress = (id, payload) => {
    return knex(table).where("id", id).update(payload)
  }

  module.deleteAddressById = (id) => {
    return knex("customers_addresses")
      .where("address_id", id)
      .del()
      .then(() => {
        return knex(table).where("id", id).del()
      })
  }

  module.deletedAdressByAttr = async (attr, id) => {
    let sql = await knex("customers_addresses").innerJoin(
      table,
      table + ".id",
      "=",
      "customers_addresses.address_id"
    )

    const address_id = sql.map((data) => {
      return data.address_id
    })

    return knex("customers_addresses")
      .where(attr, id)
      .del()
      .then(() => {
        return knex(table).whereIn("id", address_id).del()
      })
  }

  return module
}
