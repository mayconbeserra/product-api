'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = base;

var _knex = require('../../db/knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function base() {
  return {
    getById: getById.bind(this),
    getAll: getAll.bind(this),
    insert: insert.bind(this),
    update: update.bind(this),
    delete: deleteProduct.bind(this)
  };
}

var products = function products() {
  return (0, _knex2.default)('products');
};

var getAll = function getAll() {
  return products().select();
};

var getById = function getById(productId) {
  return products().where('id', parseInt(productId, 10)).first();
};

var insert = function insert(product) {
  return products().insert(product, ['id', 'name', 'category', 'price', 'active']);
};

var update = function update(id, updates) {
  return products().where('id', parseInt(id, 10)).update(updates, ['id', 'name', 'category', 'price', 'active']);
};

var deleteProduct = function deleteProduct(id) {
  return products().where('id', parseInt(id, 10)).del();
};