const knexnest = require("knexnest")

const table = "addresses"

module.exports = (knex) => {
  module.getAddresses = (userId, { perPage, currentPage }) => {
    return knex("users")
      .select(`${table}.id`, `${table}.address`)
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
      .select(`${table}.id`, `${table}.address`, "customers.user_id")
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
    return knex(table).where("id", id).del()
  }

  module.deletedAdressByAttr = (attr, id) => {
    // return knex(table)
    //   .where(`customers.${attr}`, id)
    //   .innerJoin(
    //     "customers_addresses",
    //     "customers_addresses.address_id",
    //     "=",
    //     "addresses.id"
    //   )
    //   .innerJoin(
    //     "customers",
    //     "customers.id",
    //     "=",
    //     "customers_addresses.customer_id"
    //   )
    //   .delete()

    return knex("customers_addresses")
      .whereIn("customer_id", function () {
        this.select("id").from("customers").where(attr, id)
      })
      .whereIn("address_id", function () {
        this.select("id").from("addresses")
      })
      .del()
  }

  return module
}
