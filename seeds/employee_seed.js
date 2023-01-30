/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("employees").del()
  await knex("employees").insert([
    {
      id: 1,
      name: "Aliamat Parinduri",
      phone: "6289535231352",
      user_id: 1,
    },
  ])
}
