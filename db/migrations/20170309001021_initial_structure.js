exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    table.string('category').notNullable();
    table.decimal('price').notNullable();
    table.boolean('active').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
