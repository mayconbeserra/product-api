'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    productsPost: _validateProducts.validatePost,
    productsPut: _validateProducts.validatePut
  };
};

var _validateProducts = require('./validateProducts');