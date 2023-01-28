const { passwordHash } = require("../modules/utils/authentication")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del()
  await knex("users").insert([
    {
      id: 1,
      name: "Aliamat Parinduri",
      email: "aliamat29@gmail.com",
      password: await passwordHash("password"),
      phone: "6289535231352",
    },
  ])
}
