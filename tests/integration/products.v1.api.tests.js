import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import config from '../../config';
import { application } from '../../src/app';
import knex from '../../db/knex';

chai.use(chaiHttp);
const baseUrl = '/api/v1/products';
let server;

describe(`Testing --> ${baseUrl}`, () => {
  before(async () => {
    server = await application(config);
  });

  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            return knex.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  afterEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        done();
      });
  });

  describe('GET', () => {
    it('should return a list of products', (done) => {
      chai.request(server)
        .get(baseUrl)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res).to.have.status(200);
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0]).to.have.property('category');
          expect(res.body[0]).to.have.property('price');
          expect(res.body[0]).to.have.property('active');
          return done();
        });
    });

    it('should return a single record', (done) => {
      chai.request(server)
        .get(`${baseUrl}/1`)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('category');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('active');
          return done();
        });
    });
  });

  describe('POST', () => {
    it('should add a new product', (done) => {
      chai.request(server)
        .post(baseUrl)
        .send({
          name: 'Vision - Post',
          category: 'firstClass',
          price: 999,
          active: true,
        })
        .end(async (err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('name', 'Vision - Post');
          expect(res.body).to.have.property('category', 'firstClass');
          expect(res.body).to.have.property('price', parseFloat(999).toFixed(2));
          expect(res.body).to.have.property('active', true);

          return done();
        });
    });

    it('should return a bad request when the body is empty', (done) => {
      chai.request(server)
        .post(baseUrl)
        .send({ })
        .end(async (err, res) => {
          expect(res).to.have.status(400);
          return done();
        });
    });
  });

  describe('PUT', () => {
    it('should update the product', (done) => {
      const payload = {
        name: 'Vision - put',
        category: 'firstClass',
        price: 222,
        active: true,
      };

      chai.request(server)
        .post(baseUrl)
        .send(payload)
        .end(async (er, re) => {
          chai.request(server)
            .put(`${baseUrl}/${re.body.id}`)
            .send(payload)
            .end(async (err, res) => {
              if (err) return done(err);

              expect(res).to.have.status(200);
              expect(res.body).to.have.property('id');
              expect(res.body).to.have.property('name', 'Vision - put');
              expect(res.body).to.have.property('category', 'firstClass');
              expect(res.body).to.have.property('price', parseFloat(222).toFixed(2));
              expect(res.body).to.have.property('active', true);

              return done();
            });
        });
    });

    it('should return a bad request when the body is empty', (done) => {
      chai.request(server)
        .put(`${baseUrl}/9999`)
        .send({ })
        .end(async (err, res) => {
          expect(res).to.have.status(400);
          return done();
        });
    });

    it('should return a bad request when the id is part of the body', (done) => {
      chai.request(server)
        .put(`${baseUrl}/9999`)
        .send({ id: 999, name: 'name' })
        .end(async (err, res) => {
          expect(res).to.have.status(400);
          return done();
        });
    });

    it('should return a bad request when the id is NOT an integer', (done) => {
      chai.request(server)
        .put(`${baseUrl}/abc`)
        .send({ name: 'name' })
        .end(async (err, res) => {
          expect(res).to.have.status(400);
          return done();
        });
    });
  });

  describe('DELETE', () => {
    it('should delete an existing product', (done) => {
      chai.request(server)
        .post(baseUrl)
        .send({
          name: 'Vision',
          category: 'firstClass',
          price: 999,
          active: true,
        })
        .end(async (err, res) => {
          expect(res).to.have.status(201);
          chai.request(server)
            .delete(`${baseUrl}/${res.body.id}`)
            .end(async (er, re) => {
              expect(re).to.have.status(200);
              return done();
            });
        });
    });

    it('should return a bad request when the product does NOT exist', (done) => {
      chai.request(server)
        .delete(`${baseUrl}/9999`)
        .end(async (err, res) => {
          expect(res).to.have.status(404);
          return done();
        });
    });
  });
});
