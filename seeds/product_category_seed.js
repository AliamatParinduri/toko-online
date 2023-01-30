/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products_categories").del()
  await knex("products_categories").insert([
    { id: 1, product_id: 1, category_id: 1 },
    { id: 2, product_id: 1, category_id: 1 },
    { id: 3, product_id: 1, category_id: 1 },
  ])
}
