import 'babel-polyfill';
import { expect } from 'chai';
import sinon from 'sinon';
import ProductService from '../../../src/services/v1/product';
import ProductsRepository from '../../../src/repositories/productsRepository';

describe('Testing --> Services.Products', () => {
  describe('Detail', () => {
    it('should return a specified Product', async () => {
      const repository = new ProductsRepository();
      sinon.stub(repository, 'getById', fakeProduct);

      const result = await ProductService({ repo: repository }).detail(1);
      const expected = fakeProduct();

      expect(result).to.have.property('id', expected.id);
      expect(result).to.have.property('name', expected.name);
      expect(result).to.have.property('category', expected.category);
      expect(result).to.have.property('price', expected.price);
      expect(result).to.have.property('active', expected.active);
    });
  });

  describe('Create', () => {
    it('should create a new product', async () => {
      const repository = new ProductsRepository();
      sinon.stub(repository, 'insert', fakeProduct);

      const result = await ProductService({ repo: repository }).create(fakeProduct);
      const expected = fakeProduct();

      expect(result).to.have.property('id', expected.id);
      expect(result).to.have.property('name', expected.name);
      expect(result).to.have.property('category', expected.category);
      expect(result).to.have.property('price', expected.price);
      expect(result).to.have.property('active', expected.active);
    });
  });

  describe('Update', () => {
    it('should update an existing product', async () => {
      const repository = new ProductsRepository();
      sinon.stub(repository, 'update', fakeProduct);

      const result = await ProductService({ repo: repository }).update(1, fakeProduct);
      const expected = fakeProduct();

      expect(result).to.have.property('id', expected.id);
      expect(result).to.have.property('name', expected.name);
      expect(result).to.have.property('category', expected.category);
      expect(result).to.have.property('price', expected.price);
      expect(result).to.have.property('active', expected.active);
    });
  });

  describe('Delete', () => {
    it('should delete an existing product', async () => {
      const repository = new ProductsRepository();
      sinon.stub(repository, 'delete', fakeProduct);

      const result = await ProductService({ repo: repository }).del(1);
      const expected = fakeProduct();

      expect(repository.delete.calledOnce).to.be.equals(true);
      expect(repository.delete.getCall(0).args[0]).to.be.equals(1);
      expect(result).to.have.property('id', expected.id);
      expect(result).to.have.property('name', expected.name);
      expect(result).to.have.property('category', expected.category);
      expect(result).to.have.property('price', expected.price);
      expect(result).to.have.property('active', expected.active);
    });
  });

  describe('List', () => {
    it('should list all products', async () => {
      const repository = new ProductsRepository();
      sinon.stub(repository, 'getAll', fakeProducts);

      const result = await ProductService({ repo: repository }).list();
      let index = 0;
      result.forEach((element) => {
        const fakeProduct = fakeProducts()[index];
        Object.keys(fakeProducts()[index]).forEach((key) => {
          expect(element).to.have.property(key, fakeProduct[key]);
        });
        index += 1;
      });
    });
  });
});

const fakeProduct = () => {
  return {
    id: 1,
    name: 'VISI/pocket',
    category: 'firstClass',
    price: 999,
    active: true,
  };
};

const fakeProducts = () => {
  return [
    {
      id: 1,
      name: 'VISI/pocket',
      category: 'firstClass',
      price: 999,
      active: true,
    },
    {
      id: 2,
      name: 'VISI/frame',
      category: 'secondClass',
      price: 499,
      active: true,
    },
  ];
};
