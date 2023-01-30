/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("orders_header").del()
  return knex("orders_header").insert([
    { id: 1, address_id: 1, user_id: 1, coupon_id: 1, total: 1000 },
    { id: 2, address_id: 1, user_id: 1, coupon_id: 1, total: 1000 },
    { id: 3, address_id: 1, user_id: 1, coupon_id: 1, total: 1000 },
  ])
}
