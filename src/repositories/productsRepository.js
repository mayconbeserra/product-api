import knex from '../../db/knex';

export default function base () {
  return {
    getById: getById.bind(this),
    getAll: getAll.bind(this),
    insert: insert.bind(this),
    update: update.bind(this),
    delete: deleteProduct.bind(this),
  };
}

const products = () => {
  return knex('products');
};

const getAll = () => {
  return products().select();
};

const getById = (productId) => {
  return products().where('id', parseInt(productId, 10)).first();
};

const insert = (product) => {
  return products().insert(
    product,
    ['id', 'name', 'category', 'price', 'active'],
  );
};

const update = (id, updates) => {
  return products()
    .where('id', parseInt(id, 10))
    .update(updates, ['id', 'name', 'category', 'price', 'active']);
};

const deleteProduct = (id) => {
  return products().where('id', parseInt(id, 10)).del();
};
