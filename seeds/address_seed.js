/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("addresses").del()
  await knex("addresses").insert([
    { id: 1, address: "address1", user_id: 1 },
    { id: 2, address: "address2", user_id: 1 },
    { id: 3, address: "address3", user_id: 1 },
  ])
}
