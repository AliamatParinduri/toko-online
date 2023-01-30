/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("employees", function (table) {
    table.increments("id")
    table.string("name").notNullable()
    table.string("phone").notNullable()
    table.string("profilePicture").defaultTo("default.jpg")
    table.integer("user_id").notNullable()
    table.foreign("user_id").references("users.id")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("employees")
}
