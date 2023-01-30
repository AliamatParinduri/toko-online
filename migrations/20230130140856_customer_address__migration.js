/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("customers_addresses", function (table) {
    table.increments("id")
    table.integer("customer_id").notNullable()
    table.foreign("customer_id").references("customers.id")
    table.integer("product_id").notNullable()
    table.foreign("product_id").references("products.id")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("customers_addresses")
}
