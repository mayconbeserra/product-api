import { validatePost, validatePut } from './validateProducts';

export default function () {
  return {
    productsPost: validatePost,
    productsPut: validatePut,
  };
}
