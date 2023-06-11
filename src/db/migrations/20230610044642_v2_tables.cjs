/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    if (! (await knex.schema.hasTable('users')) ) {
      await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.string('profile').notNullable().defaultTo('User');
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    })}
      if (! (await knex.schema.hasTable('yarn')) ) {
        await knex.schema.createTable('yarn', (table) => {
          table.increments('id').primary();
          table.integer('rav_id').notNullable();
          table.string('name').notNullable();
          table.string('yarn_company').notNullable();
          table.string('yarn_weight');
          table.integer('yardage');
          table.integer('grams');
          table.boolean('machine_washable');
          table.string('texture');
          table.string('photo');
          table.string('permalink').notNullable();
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
            .inTable('yarn')
            .unsigned()
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
          table.integer('skeins');
          table.string('notes');
        })}
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('users_yarn').dropTable('yarn').dropTable('users');
  };