'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validation = require('../middlewares/validation');

var _validation2 = _interopRequireDefault(_validation);

var _product = require('./product');

var product = _interopRequireWildcard(_product);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapRoute = function wrapRoute(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(null, args) // eslint-disable-line
    .catch(args[2]); // call next()
  };
};

exports.default = function (app) {
  app.get('/api/v1/products', wrapRoute(product.list));
  app.get('/api/v1/products/:id', wrapRoute(product.detail));
  app.put('/api/v1/products/:id', (0, _validation2.default)().productsPut, wrapRoute(product.update));
  app.post('/api/v1/products', (0, _validation2.default)().productsPost, wrapRoute(product.create));
  app.delete('/api/v1/products/:id', wrapRoute(product.del));
  app.get('/_ping', function (req, res) {
    res.status(200).end();
  });

  app.use(function (req, res) {
    res.status(404).end();
  });
};