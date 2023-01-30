/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("categories").del()
  await knex("categories").insert([
    { id: 1, name: "javascript" },
    { id: 2, name: "php" },
    { id: 3, name: "golang" },
    { id: 4, name: "java" },
    { id: 5, name: "python" },
  ])
}
