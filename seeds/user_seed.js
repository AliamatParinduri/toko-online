const { passwordHash } = require("../utils/authentication")

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
      email: "aliamat29@gmail.com",
      password: await passwordHash("password"),
    },
    {
      id: 2,
      email: "aliamat30@gmail.com",
      password: await passwordHash("password"),
    },
    {
      id: 3,
      email: "aliamat31@gmail.com",
      password: await passwordHash("password"),
    },
  ])
}
