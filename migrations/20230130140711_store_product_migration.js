/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("stores_products", function (table) {
    table.increments("id")
    table.integer("product_id").notNullable()
    table.foreign("product_id").references("products.id")
    table.integer("store_id").notNullable()
    table.foreign("store_id").references("stores.id")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("stores_products")
}
