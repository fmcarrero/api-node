const { createContainer, Lifetime ,asValue ,asClass ,asFunction} = require('awilix');
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
  .register({
    app: asClass(Application, { lifetime: Lifetime.SINGLETON }),
    server: asClass (Server, { lifetime: Lifetime.SINGLETON })
  })
  .register({
    router: asFunction(router, { lifetime: Lifetime.SINGLETON }),
    logger: asFunction(logger, { lifetime: Lifetime.SINGLETON })
  })
  .register({ config : asValue(config) });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction (loggerMiddleware, { lifetime: Lifetime.SINGLETON })
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue (config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue (swaggerMiddleware)
  });

// Repositories
container.register({
  hotelsRepository: asClass(SequelizeHotelRepository, { lifetime: Lifetime.SINGLETON })
});

// Database
container.register({
  database : asValue(database),
  HotelModel : asValue(HotelModel)
});

// Operations
container.register({
  createHotel: asClass (CreateHotel),
  getAllHotel: asClass (GetAllHotel),
  getHotel:    asClass (GetHotel),
  updateHotel: asClass (UpdateHotel),
  deleteHotel: asClass (DeleteHotel)
});

// Serializers
container.register({
  hotelSerializer: asValue(HotelSerializer)
});

module.exports = container;
