/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  if (! (await knex.schema.hasTable('users')) ) {
    await knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('profile').notNullable().defaultTo('User');
      table.string('email').notNullable();
      table.string('password').notNullable();
  })}
  if (! (await knex.schema.hasTable('users_yarn')) ) {
    await knex.schema.createTable('users_yarn', (table) => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .unsigned()
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('yarn_id')
        .references('id')
        .inTable('users')
        .unsigned()
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })}
    if (! (await knex.schema.hasTable('yarn')) ) {
      await knex.schema.createTable('yarn', (table) => {
        table.increments('id').primary();
        table.integer('rav_id').notNullable();
        table.string('name').notNullable();
        table.string('yarn_company').notNullable();
        table.string('yarn_weight').notNullable();
        table.integer('yardage');
        table.binary('photo');
        table.string('permalink').notNullable();
    })} 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users').dropTable('users_yarn').dropTable('yarn');
};