const { createContainer, Lifetime } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const {
  CreateHotel,
  GetAllHotel,
  GetHotel,
  UpdateHotel,
  DeleteHotel
} = require('./app/hotel');

const HotelSerializer = require('./interfaces/http/hotel/HotelSerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeHotelRepository = require('./infra/hotel/SequelizeHotelRepository');
const { database, Hotel: HotelModel } = require('./infra/database/models');

const container = createContainer();

// System
container
  .registerClass({
    app: [Application, { lifetime: Lifetime.SINGLETON }],
    server: [Server, { lifetime: Lifetime.SINGLETON }]
  })
  .registerFunction({
    router: [router, { lifetime: Lifetime.SINGLETON }],
    logger: [logger, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({ config });

// Middlewares
container
  .registerFunction({
    loggerMiddleware: [loggerMiddleware, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({
    containerMiddleware: scopePerRequest(container),
    errorHandler: config.production ? errorHandler : devErrorHandler,
    swaggerMiddleware: [swaggerMiddleware]
  });

// Repositories
container.registerClass({
  hotelsRepository: [SequelizeHotelRepository, { lifetime: Lifetime.SINGLETON }]
});

// Database
container.registerValue({
  database,
  HotelModel
});

// Operations
container.registerClass({
  createHotel: CreateHotel,
  getAllHotel: GetAllHotel,
  getHotel: GetHotel,
  updateHotel: UpdateHotel,
  deleteHotel: DeleteHotel
});

// Serializers
container.registerValue({
  hotelSerializer: HotelSerializer
});

module.exports = container;
