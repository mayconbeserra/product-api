# Welcome to Product API

This API is responsible for storing, updating, deleting and getting information for products.

# Project structure

- **Root**
  - **bin**: bootstrap the app
  - **db**: contains the migrations and it also includes the seeding part
  - **lib**: compiled code from babel
  - **src**:
    - **api**: contains all the api routes and handle the calls
    - **middleware**: contains all the middleware available. For now, there is only the validation middleware
    - **repositories**: contains all the repositories. This is a simple implementation of repository pattern
    - **services**: this layer is responsible for manipulating the business logic for this micro-service
      - **v1/product**: most the time, the api versioning can be done in the services layer. At the moment, I have only created the version one for the product service, but it can also be created for the api/v1/products
    - app: express
  - **tests**:
    - **integration**: contains some integration tests
    - **unittests**: unit tests created

# Tech Stack

* NodeJS
* express
* babel
* mocha
* chai
* sinon
* knex
* postgres
* eslint

# Software engineering practices

* TDD
* Integration tests
* SOLID
* Middleware
* Repository Pattern

# Requirements

* Docker version 17.03.0-ce, build 60ccb22
* Node v7.7.1

# How to run the tests?

As I have used TDD for the services part, some unit tests were created, but I have also created some integrations tests. To make it easier to test, I have setup a docker-compose to run the tests. The steps are below:

* clone the repository
* `docker-compose stop`
* `docker-compose up --force-recreate --remove-orphans ci`

# How to run the app?

* clone the repository
* `docker-compose stop`
* `docker-compose up --force-recreate --remove-orphans local`

# API versioning

The API is versioned by url (e.g. api/v1/products), but only the services layer has a unique file for the version. For more complex environments, I'd use the same approach from the services layer inside the api routes as well (using nodeJS isn't something complex). Well, there are several ways to versioning your api, but I think this is one simple and very effective way to solve this problem. However, adding a versioning in the header is also suitable when you don't want to impact the consumers of your API.
PS: in our industry, there are several developers complaining about this approach (versioning by url), but some big companies are still using this approach (e.g. google https://www.googleapis.com/customsearch/v1?key=....)

Routes and versions:

* GET - `/api/v1/products`
* GET - `/api/v1/products/:id`
* POST - `/api/v1/products`
* PUT - `/api/v1/products/:id`
* DELETE - `/api/v1/products/:id`
