/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("orders", function (table) {
    table.increments("id")
    table.float("total").notNullable()
    table.integer("address_id").notNullable()
    table.foreign("address_id").references("addresses.id")
    table.integer("customer_id").notNullable()
    table.foreign("customer_id").references("customers.id")
    table.integer("coupon_id")
    table.foreign("coupon_id").references("coupons.id")
    table
      .enum("status", ["ordered", "delivered", "canceled", "completed"])
      .defaultTo("ordered")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("orders")
}
