/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("coupons", function (table) {
    table.increments("id")
    table.string("code", 255).unique().notNullable()
    table.string("description", 255)
    table.float("percentage")
    table.float("fixedDiscount")
    table.integer("qty")
    table.boolean("disposable").defaultTo(0)
    table.boolean("isActive").defaultTo(1)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("coupons")
}
