/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("coupons").del()
  await knex("coupons").insert([
    { id: 1, code: "1212", description: "lorem" },
    { id: 2, code: "AKHIRTAHUN", description: "lorem" },
    { id: 3, code: "GEBYARRAMADHAN", description: "lorem" },
  ])
}
