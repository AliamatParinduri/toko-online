/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("customers_addresses", function (table) {
    table.increments("id")
    table.integer("customer_id").notNullable()
    table.foreign("customer_id").references("customers.id")
    table.integer("address_id").notNullable()
    table.foreign("address_id").references("addresses.id")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("customers_addresses")
}
