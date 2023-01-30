/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("orders_header", function (table) {
    table.increments("id")
    table.float("total").notNullable()
    table.integer("address_id").notNullable()
    table.foreign("address_id").references("addresses.id")
    table.integer("user_id").notNullable()
    table.foreign("user_id").references("users.id")
    table.integer("coupon_id").notNullable()
    table.foreign("coupon_id").references("coupons.id")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("orders_header")
}
