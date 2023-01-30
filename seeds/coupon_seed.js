/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("coupons").del()
  await knex("coupons").insert([
    {
      id: 1,
      code: "1212",
      description: "lorem",
      percentage: 10,
      fixedDiscount: 0,
    },
    {
      id: 2,
      code: "AKHIRTAHUN",
      description: "lorem",
      percentage: 0,
      fixedDiscount: 15000,
    },
    {
      id: 3,
      code: "GEBYARRAMADHAN",
      description: "lorem",
      percentage: 15,
      fixedDiscount: 0,
    },
  ])
}
