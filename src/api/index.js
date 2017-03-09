import val from '../middlewares/validation';
import * as product from './product';

const wrapRoute = (fn) => {
  return function (...args) {
    return fn.apply(null, args) // eslint-disable-line
      .catch(args[2]); // call next()
  };
};

export default (app) => {
  app.get('/api/v1/products', wrapRoute(product.list));
  app.get('/api/v1/products/:id', wrapRoute(product.detail));
  app.put('/api/v1/products/:id', val().productsPut, wrapRoute(product.update));
  app.post('/api/v1/products', val().productsPost, wrapRoute(product.create));
  app.delete('/api/v1/products/:id', wrapRoute(product.del));
  app.get('/_ping', (req, res) => {
    res.status(200).end();
  });

  app.use((req, res) => {
    res.status(404).end();
  });
};
