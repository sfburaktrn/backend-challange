/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("posts").truncate();
  await knex("comments").truncate();
  await knex("users_comments").truncate();
  await knex("users").insert([
    {
      name: "Sefa",
      email: "sefa@gmail.com",
      password: "$2a$12$.zuCZfb1lXUZ1hWlngs8/.M63vF9vJwupXhPFKZSggBAL5vnwNXIK",
      // password:"asdf"
    },
    {
      name: "Kadir",
      email: "kadir@hotmail.com",
      password: "$2a$12$L.uJZyfIX8ke8495CMaRrehsguGjRULrkMqd9ssLV9Lxo0E2beW5y",
      // password:"1234"
    },
    {
      name: "FurkanA",
      email: "furkan@yahoo.com",
      password: "$2a$12$Sw1GSveCpajWnlRgTuGvAeXJizgy7RBgdqCJ.dZXL4RUY7IP98kf2",
      // password:"6789"
    },
  ]);
  await knex("posts").insert([
    { post_content: "Hello world", user_id: 1 },
    { post_content: "I am bored", user_id: 1 },
    { post_content: "economy is very good", user_id: 2 },
    { post_content: "my life is going well", user_id: 3 },
  ]);
  await knex("comments").insert([
    { post_comment: "Welcome", post_id: 1 },
    { post_comment: "we can play games", post_id: 2 },
    { post_comment: "sen ne anlatıyon be abi", post_id: 3 },
    { post_comment: "are you sure?", post_id: 3 },
    { post_comment: "I am pleased for you", post_id: 4 },
  ]);

  await knex("users_comments").insert([
    { user_id: 1, comment_id: 1 },
    { user_id: 1, comment_id: 2 },
    { user_id: 2, comment_id: 3 },
    { user_id: 2, comment_id: 4 },
    { user_id: 3, comment_id: 5 },
  ]);
};
