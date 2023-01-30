/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("stores_products").del()
  await knex("stores_products").insert([
    { id: 1, product_id: 1, store_id: 1 },
    { id: 2, product_id: 1, store_id: 1 },
    { id: 3, product_id: 1, store_id: 1 },
  ])
}
