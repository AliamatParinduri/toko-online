/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("stores").del()
  await knex("stores").insert([
    {
      id: 1,
      name: "Aliamat Parinduri",
      phone: "6289535231352",
      description: "ini deskripsi",
      user_id: 1,
    },
  ])
}
