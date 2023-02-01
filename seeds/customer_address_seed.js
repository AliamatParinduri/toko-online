/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("customers_addresses").del()
  await knex("customers_addresses").insert([
    { id: 1, customer_id: 1, address_id: 1 },
    { id: 2, customer_id: 1, address_id: 2 },
    { id: 3, customer_id: 1, address_id: 3 },
  ])
}
