/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex("products").insert([
    {
      id: 1,
      title: "rowValue1",
      description: "desc1",
      price: 1000,
      image: "https://placeimg.com/480/480/tech",
    },
    {
      id: 2,
      title: "rowValue2",
      description: "desc2",
      price: 2000,
      image: "https://placeimg.com/480/480/tech",
    },
    {
      id: 3,
      title: "rowValue3",
      description: "desc3",
      price: 3000,
      image: "https://placeimg.com/480/480/tech",
    },
    {
      id: 4,
      title: "rowValue4",
      description: "desc4",
      price: 4000,
      image: "https://placeimg.com/480/480/tech",
    },
    {
      id: 5,
      title: "rowValue5",
      description: "desc5",
      price: 5000,
      image: "https://placeimg.com/480/480/tech",
    },
  ])
};
