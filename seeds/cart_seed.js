/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("carts").del()
  await knex("carts").insert([
    { id: 1, user_id: 1, product_id: 1, qty: 2 },
    { id: 2, user_id: 2, product_id: 1, qty: 1 },
    { id: 3, user_id: 1, product_id: 2, qty: 2 },
  ])
}
