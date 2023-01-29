/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  let data = []

  for (let i = 1; i <= 5; i++) {
    data = [
      ...data,
      {
        id: i,
        name: `rowValue${i}`,
        description: `desc${i}`,
        stock: `${i}00`,
        price: `${i}000`,
        image: "https://placeimg.com/480/480/tech",
      },
    ]
  }

  await knex("products").del()
  await knex("products").insert(data)
}
