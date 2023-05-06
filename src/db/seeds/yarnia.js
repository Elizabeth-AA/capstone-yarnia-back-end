const userData = require('./seed_data/users');
const userYarnData = require('./seed_data/users_yarn');
const yarnData = require('./seed_data/yarn');

exports.seed = function (knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert(userData);
    })
    .then(() => {
      return knex('users_yarn').del();
    })
    .then(() => {
      return knex('users_yarn').insert(userYarnData);
    })
    .then(() => {
      return knex('yarn').del();
    })
    .then(() => {
      return knex('yarn').insert(yarnData);
    })
}