/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("carts", function (table) {
    table.increments("id")
    table.integer("customer_id").notNullable()
    table.foreign("customer_id").references("customers.id")
    table.integer("product_id").notNullable()
    table.foreign("product_id").references("products.id")
    table.integer("qty").notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("carts")
}
