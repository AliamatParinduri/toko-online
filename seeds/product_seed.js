/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  let data = []

  for (let i = 1; i <= 5; i++) {
    data = [...data, {
      id: i,
      title: `rowValue${i}`,
      description: `desc${i}`,
      qty: `${i}00`,
      price: `${i}000`,
      image: "https://placeimg.com/480/480/tech",
    },]
  }

  await knex('products').del()
  await knex("products").insert(data)
};
