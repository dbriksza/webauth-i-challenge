exports.seed = function(knex) {
  return knex("users").insert([
    { username: "asdasd1", password: "asdasd1" },
    { username: "asdasd2", password: "asdasd2" },
    { username: "asdasd3", password: "asdasd3" }
  ]);
};
