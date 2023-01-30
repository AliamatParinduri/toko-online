/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("orders_detail").del()
  await knex("orders_detail").insert([
    { id: 1, order_id: 1, cart_id: 1 },
    { id: 2, order_id: 1, cart_id: 1 },
    { id: 3, order_id: 1, cart_id: 1 },
  ])
}
